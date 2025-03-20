export default function Page() {

    const expertises = [
        'Java & Spring Framework (Boot, Security, Data)',
        'Microservice Architecture Design and Implementation',
        'gRPC, Restful API Development',
        'Database Management with JPA/Hibernate',
        'Test Automation and Software Quality Processes',
        'Educational Videos and Technical Blogging',
    ];

    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                💻 {'\t '}About Me
            </h1>
            <p className="mb-4">Hi, I’m <strong>Samet Akbal</strong>! With over 4+ years of experience in software
                development, I
                specialize in modern technologies and architectures. I have developed large-scale projects
                using <strong>Java</strong>, <strong>Spring
                    Boot</strong>, <strong>gRPC</strong>, <strong>microservices</strong>, and cloud-based solutions.</p>
            <p>In addition to my technical expertise, I am passionate about creating educational content. My goal is to
                share the core principles of software engineering and best practices with professionals and students
                alike.</p>
            <hr className="mt-5 mb-5"/>

            <h2 className="mb-5">🚀 Key Expertise:</h2>

            <ul>
                {
                    expertises.map((expertise, index) => (
                        <li key={index + 1}>- {expertise}</li>
                    ))
                }
            </ul>
        </section>
    )
}
