import "./homeIndex.css"
export default function HomeIndex() {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Rotaract</h1>
                <p>Working together for a better world.</p>
                <button>Join Us</button>
            </section>

            <section id="about" className="about">
                <h2>About Us</h2>
                <p>Information about the organization...</p>
            </section>

            <section id="projects" className="projects">
                <h2>Our Projects</h2>
                <p>Details about the projects...</p>
            </section>

            <section id="donate" className="donate">
                <h2>Support Our Cause</h2>
                <button>Donate Now</button>
            </section>
        </div>
    )
}
