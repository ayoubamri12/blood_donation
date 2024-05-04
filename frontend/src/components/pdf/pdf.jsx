import jsPDF from 'jspdf';

const PdfGenerator = () => {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("document.pdf");
    };

    return (
        <div>
            <h1>PDF Generator</h1>
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default PdfGenerator;
