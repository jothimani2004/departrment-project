import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const NoteViewer = () => {
  const [searchParams] = useSearchParams();
  const noteTitle = searchParams.get("title"); // Get the title from the URL query param
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (noteTitle) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(`/notes/${noteTitle}`);
          setNote(response.data);
        } catch (error) {
          setError("Failed to load note");
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }
  }, [noteTitle]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  // Determine how to display the note based on its MIME type
  const renderNoteContent = () => {
    if (note.notes_type.startsWith("image")) {
      // Render image
      const imageSrc = `data:${note.notes_type};base64,${note.notes_data}`;
      return <img src={imageSrc} alt={note.notes_name} className="w-full max-h-[500px] object-contain" />;
    } else if (note.notes_type.startsWith("video")) {
      // Render video
      const videoSrc = `data:${note.notes_type};base64,${note.notes_data}`;
      return (
        <video controls className="w-full">
          <source src={videoSrc} type={note.notes_type} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (note.notes_type === "application/pdf") {
      // Render PDF
      const pdfSrc = `data:${note.notes_type};base64,${note.notes_data}`;
      return (
        <iframe
          src={pdfSrc}
          title={note.notes_name}
          width="100%"
          height="600px"
          className="border border-gray-300"
        ></iframe>
      );
    } else if (note.notes_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || note.notes_type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      // Handle Word or PPT files
      const fileSrc = `data:${note.notes_type};base64,${note.notes_data}`;
      return (
        <div>
          <a
            href={fileSrc}
            download={note.notes_name}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Download {note.notes_name}
          </a>
          {/* <iframe
            src={`https://docs.google.com/gview?url=${fileSrc}&embedded=true`}
            title="file-preview"
            width="100%"
            height="600px"
            className="border border-gray-300"
          /> */}
        </div>
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{noteTitle}</h1>
      <p className="mb-6">{note.notes_desc}</p>
      {renderNoteContent()}
    </div>
  );
};

export default NoteViewer;
