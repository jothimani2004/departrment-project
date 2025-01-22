



export default function(){




    const edit_pages = [
        {
            "title":"Acadimic calander",
            "content": "Click to Change the acadimic calander pdf.",
            "link":"https://www.google.com"
        },
        {
            "title":"Acadimic time table",
            "content":  "Click to Change the time table pdf.",
            "link":"https://www.google.com"
        },
        {
            "title":"Journal Publication ",
            "content": "Click to update the journal.",
            "link":"https://www.google.com"
        },
        {
            "title":" Paper Publication",
            "content": "Click to update the paper.",
            "link":"https://www.google.com"
        },
        {
            "title":"Patent Publication",
            "content": "Click to update the patent.",
            "link":"https://www.google.com"
        },
        {
            "title":"Major events",
            "content": "Edit Major events schedule.",
            "link":"https://www.google.com"
        },
        {
            "title":"CoCurricular events",
            "content": "Edit CoCurricular events schedule.",
            "link":"https://www.google.com"
        },
        {
            "title":"Extra Curricular events",
            "content": "Edit Extra Curricular events schedule.",
            "link":"https://www.google.com"
        }
    ]


    return (
        <>
        <div class="m-4">
                <h1 class="text-md-center">Admin page</h1>
            <div class="row">


                {
                    edit_pages.map((item,index)=>
                        <div class="col-sm-6  mt-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title fw-bolder">{item.title}</h5>
                                    <p class="card-text fw-bold">{item.content}</p>
                                    <a href={item.link} class="btn btn-primary" target="_blank">Edit Page</a>
                                </div>
                            </div>
                        </div>
                    
                    )
                }
            

            
          

            </div>

        </div>
        
        </>
    )
}