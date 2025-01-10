import React, { createContext, useState } from 'react';

// Create the context
export const DomainContext = createContext();

// Context provider component
export const DomainProvider = ({ children }) => {
  const domainDetails = {
    InternetOfThings: {
      title: "Internet Of Things",
      details: "The internet of things, or IoT, is a network of interrelated devices that connect and exchange data with other IoT devices and the cloud. IoT devices are typically embedded with technology such as sensors and software and can include mechanical and digital machines and consumer objects These devices encompass everything from everyday household items to complex industrial tools. Increasingly, organizations in a variety of industries are using IoT to operate more efficiently, deliver enhanced customer service, improve decision-making and increase the value of the business. With IoT, data is transferable over a network without requiring human-to-human or human-to-computer interactions.A thing in the internet of things can be a person with a heart monitor implant, a farm animal with a biochip transponder, an automobile that has built-in sensors to alert the driver when tire pressure is low, or any other natural or man-made object that can be assigned an Internet Protocol address and can transfer data over a network."
    },
    CyberSecurity: {
      title: "Cyber Security",
      details:"Cybersecurity is a crucial discipline in today’s digital age, where the exponential growth of technology has led to an increased risk of cyber threats and data breaches. It encompasses the protection of systems, networks, and data from unauthorized access, attacks, damage, and theft. As cyber criminals develop increasingly sophisticated techniques, the need for robust security measures becomes more vital than ever. This field covers a wide range of practices, including network security, application security, information security, disaster recovery, and operational security. A core focus is on ensuring the confidentiality, integrity, and availability of data, commonly referred to as the CIA triad. With the rise of ransomware, phishing, and other forms of cyber attacks, cybersecurity professionals are responsible for developing strategies to defend against these threats, mitigate vulnerabilities, and respond to incidents when they occur. Ethical hacking, penetration testing, and risk assessment are also key elements of cybersecurity, allowing organizations to identify and fix weaknesses before they can be exploited. As businesses and governments increasingly rely on digital infrastructures, the demand for skilled cybersecurity experts continues to grow, making this a dynamic and rapidly evolving field that plays a critical role in protecting the global economy and personal privacy."
    },
    BlockchainTechnology: {
      title: "BlockChain Technology",
      details:"Blockchain technology is a revolutionary innovation that has transformed the way data is stored, managed, and transferred across decentralized networks. At its core, blockchain is a distributed ledger that records transactions in a secure, transparent, and immutable manner. It eliminates the need for intermediaries by allowing participants to engage in peer-to-peer exchanges while ensuring trust and integrity through cryptographic methods. Every transaction on a blockchain is recorded in blocks, which are linked in chronological order, forming an unbreakable chain that is continuously verified by a network of nodes. This decentralized nature ensures that no single entity has control over the entire system, making it resilient to tampering, hacking, and fraud. While blockchain was initially introduced as the underlying technology for cryptocurrencies like Bitcoin, its potential extends far beyond digital currency. Industries such as finance, supply chain, healthcare, and real estate are exploring blockchain’s applications for improving efficiency, reducing costs, and enhancing security. Smart contracts, another key feature of blockchain, automate and enforce agreements without the need for intermediaries, further streamlining processes. The technology’s ability to provide transparency, data integrity, and traceability is driving its adoption in various sectors. Despite the immense promise, blockchain still faces challenges such as scalability, energy consumption, and regulatory concerns. However, ongoing advancements and research in this field suggest that blockchain could become a foundational technology for secure, decentralized systems in the future, reshaping industries and economies on a global scale."
    }
  };

  

  const [selectedDomain, setSelectedDomain] = useState(domainDetails.iot);

  const resourses=["ResearchPapers","Notes","Links","Videos"]

  const [selectedresourse,setselectedresourse]=useState('IEEEPapers');




  return (
    <DomainContext.Provider value={{ selectedDomain, setSelectedDomain, domainDetails,selectedresourse,setselectedresourse,resourses }}>
      {children}
    </DomainContext.Provider>
  );
};
