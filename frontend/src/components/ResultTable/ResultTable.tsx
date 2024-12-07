import "./ResultTable.css";
import { useEffect, useState } from "react";

interface Document {
    id: number;
    title: string;
}

interface ResultTableProps {
    documents: { document: Document; score: number }[];
}

const ResultTable: React.FC<ResultTableProps> = ({ documents }) => {
    console.log(documents);
    
    const [documentList, setDocumentList] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
        setDocumentList(
            documents.map((item) => (
                <div key={item.document.id} className="search-item">
                    <h4 className="mb-1">
                        <a href="#">{item.document.title}</a>
                    </h4>
                        <div className="font-13 text-success mb-3">Download document</div>
                        <p className="mb-0 text-muted">
                            Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum quis in sit varius lorem sit metus mi.
                        </p>
                </div>
          ))
        );
      }, [documents]);
    
    return (
        <>
            <ul className="nav nav-tabs tabs-bordered">
                <li className="nav-item"><a href="#home" data-toggle="tab" aria-expanded="true" className="nav-link active">Results <span className="badge badge-success ml-1">{documents.length}</span></a></li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active" id="home">
                    <div className="row">
                        <div className="col-md-12">
                            {documentList}
                            <ul className="pagination justify-content-end pagination-split mt-0">
                                <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span> <span className="sr-only">Previous</span></a></li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span> <span className="sr-only">Next</span></a></li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultTable;