import { useState } from "react";
import ResultTable from "../ResultTable/ResultTable";
import "./SearchPage.css";

const SearchPage = () => {
    const [firstLoad, setFirstLoad] = useState(true);
    const [resultsFound, setResultsFound] = useState(true);

    return (
        <div className="content">
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="search-result-box card-box">

                        <div className="mt-4 text-center title">
                            <img src="logo.png" className="logo" />
                            <h1>Chaymae Medical aka Chouchou</h1>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 card-margin">
                                <div className="card search-form">
                                    <div className="card-body p-0">
                                        <form id="search-form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row no-gutters">
                                                        <div className="col-lg-11 col-md-9 col-sm-12 p-0">
                                                            <input type="text" placeholder="Enter keywords, symptoms, or disease names..." className="form-control" id="search" name="search" />
                                                        </div>
                                                        <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                            <button type="submit" className="btn btn-base">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* {firstLoad && 
                            <div className="mt-4 text-center">
                                <h4 className="welcome-message">Welcome to <span className="text-primary">RareMed</span>! <br />
                                Explore a world of rare disease insights. Start your search by entering keywords, symptoms, or disease names above.</h4>
                            </div>
                        } */}
                        {resultsFound && <ResultTable /> }
                        {!resultsFound && 
                            <div className="no-results text-center mt-4">
                                <h4 className="no-results-title">No Results Found</h4>
                                <p className="no-results-message">
                                    We couldn't find any articles matching your search. <br />
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;