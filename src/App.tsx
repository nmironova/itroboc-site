import "./App.css";

function App() {
    return (
        <div className="page">
            <main className="hero">
                <img
                    className="logo"
                    src="/logo.jpg"
                    alt="ITROBOC logo"
                />
               <div className="scanner-line" />
               
                <h1>ITROBOC</h1>

                <p className="subtitle">
                    Bridge board barcode scanner
                </p>

                <p className="description">
                    Scan bridge board barcodes in seconds instead of typing
                    deals manually.
                </p>

                <button>Private Beta</button>
            </main>
        </div>
    );
}

export default App;