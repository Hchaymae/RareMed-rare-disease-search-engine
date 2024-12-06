import "./ResultTable.css";

const ResultTable = () => {
    return (
        <>
            <ul className="nav nav-tabs tabs-bordered">
                <li className="nav-item"><a href="#home" data-toggle="tab" aria-expanded="true" className="nav-link active">Results <span className="badge badge-success ml-1">325</span></a></li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active" id="home">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="search-item">
                                <h4 className="mb-1"><a href="#">Bootdey.com - Responsive Admin Template</a></h4>
                                <div className="font-13 text-success mb-3">https://www.bootdey.com</div>
                                <p className="mb-0 text-muted">Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum quis in sit varius lorem sit metus mi.</p>
                            </div>
                            <div className="search-item">
                                <h4 className="mb-1"><a href="#">Uplon - Responsive Bootstrap 4 Web App Kit</a></h4>
                                <div className="font-13 text-success mb-3">https://www.bootdey.com/bootstrap-snippets?utf8=%E2%9C%93&q=snippet</div>
                                <p className="mb-0 text-muted">Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum quis in sit varius lorem sit metus mi.</p>
                            </div>
                            <div className="search-item">
                                <h4 className="mb-1"><a href="#">Zircos - Responsive Admin Template</a></h4>
                                <div className="font-13 text-success mb-3">https://www.bootdey.com/</div>
                                <p className="mb-0 text-muted">Dolor posuere proin blandit accumsan senectus netus nullam curae, ornare laoreet adipiscing luctus mauris adipiscing pretium eget fermentum, tristique lobortis est ut metus lobortis tortor tincidunt himenaeos habitant quis dictumst proin odio sagittis purus mi, nec taciti vestibulum quis in sit varius lorem sit metus mi.</p>
                            </div>
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