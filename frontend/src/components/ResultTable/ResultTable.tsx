import "./ResultTable.css";
import { useEffect, useState } from "react";

interface Document {
    id: number;
    title: string;
    pdf_file: string | null; 
    pdf_excerpt: string | null;
}

interface ResultTableProps {
    documents: { document: Document; score: number }[];
}

const ResultTable: React.FC<ResultTableProps> = ({ documents }) => {
    const [documentList, setDocumentList] = useState<JSX.Element[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 

    useEffect(() => {
        const currentDocuments = documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        setDocumentList(
            currentDocuments.map((item) => (
                <div key={item.document.id} className="search-item">
                    <h4 className="mb-1">
                        <a 
                            href={`http://127.0.0.1:8000/media/${item.document.pdf_file}`}  
                            target="_blank" 
                            rel="noopener noreferrer">
                            {item.document.title}
                        </a>
                    </h4>
                    <p className="mb-0 text-muted">
                        {item.document.pdf_excerpt}
                    </p>
                </div>
            ))
        );
    }, [documents, currentPage]);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(documents.length / itemsPerPage);

    return (
        <>
            <ul className="nav nav-tabs tabs-bordered">
                <li className="nav-item">
                    <a href="#home" data-toggle="tab" aria-expanded="true" className="nav-link active">
                        Results <span className="badge badge-success ml-1">{documents.length}</span>
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active" id="home">
                    <div className="row">
                        <div className="col-md-12">
                            {documentList}
                            <ul className="pagination justify-content-end pagination-split mt-0">
                                {/* Previous Button */}
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <span aria-hidden="true">«</span> <span className="sr-only">Previous</span>
                                    </a>
                                </li>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index + 1}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <a
                                            className="page-link"
                                            href="#"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}

                                {/* Next Button */}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Next"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <span aria-hidden="true">»</span> <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultTable;
