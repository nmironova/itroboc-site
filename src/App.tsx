import "./App.css";

const features = [
    {
        title: "Card-by-card scanning",
        text: "Scan three hands card by card. ITROBOC completes the fourth hand automatically.",
    },
    {
        title: "Deck profiles",
        text: "Save barcode mappings for each physical deck, including non-standard decks.",
    },
    {
        title: "Multiple codes per card",
        text: "Map several barcode values to the same card when codes are inconsistent.",
    },
    {
        title: "Photo recognition",
        text: "Detect card barcodes from an image instead of scanning them one by one.",
    },
    {
        title: "PBN export",
        text: "Collect all tournament deals and export them in standard PBN format.",
    },
];

function App() {
    return (
        <div className="page">
            <main>
                <section className="hero">
                    <img className="logo" src="/logo.jpg" alt="ITROBOC logo" />
                    <div className="scanner-line" />

                    <p className="eyebrow">Private Android Beta</p>

                    <h1>Capture bridge deals without manual entry.</h1>

                    <p className="description">
                        ITROBOC captures bridge deals from barcoded cards,
                        completes the missing hand, and exports the tournament
                        in PBN format.
                    </p>
                </section>

                <section className="flow">
                    <h2>From barcoded cards to PBN.</h2>

                    <div className="steps">
                        <div>Scan cards</div>
                        <span>→</span>
                        <div>Complete deal</div>
                        <span>→</span>
                        <div>Export PBN</div>
                    </div>
                </section>

                <section className="features">
                    {features.map((feature) => (
                        <article className="feature-card" key={feature.title}>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default App;