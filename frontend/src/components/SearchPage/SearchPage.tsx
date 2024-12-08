import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ResultTable from "../ResultTable/ResultTable";
import "./SearchPage.css";

const SearchPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfResults, setNumberOfResults] = useState<number>(1);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (firstLoad) {
            setFirstLoad(false);
        }

        setLoading(true);

        const formDataObj = new FormData();
        formDataObj.append('query', searchQuery);

        try {
            const response = await fetch(`http://127.0.0.1:8000/app/search/`, {
                method: 'POST',
                body: formDataObj,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Research done successfully:', data);
                setSearchResults(data.doc_data);
                setNumberOfResults(data.doc_data.length);
            } else {
                console.error('Error researching documents:', data);
            }
        } catch (error) {
            console.error('Error:', error)
        }
        setLoading(false);
    };

    return (
        <div className="content">
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="search-result-box card-box">

                        <div className="mt-4 text-center title">
                            <img src="logo.png" className="logo" />
                            <h1>RareMed</h1>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 card-margin">
                                <div className="card search-form">
                                    <div className="card-body p-0">
                                        <form id="search-form"  onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row no-gutters">
                                                        <div className="col-lg-11 col-md-9 col-sm-12 p-0">
                                                            <input 
                                                                type="text" 
                                                                placeholder="Enter keywords, symptoms, or disease names..." 
                                                                className="form-control" 
                                                                id="query" 
                                                                name="query" 
                                                                value={searchQuery}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                            <button type="submit" className="btn btn-base">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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

                        {firstLoad && 
                            <div className="mt-4 text-center">
                                <h4 className="welcome-message">Welcome to <span className="text-primary">RareMed</span>! <br />
                                Explore a world of rare disease insights. Start your search by entering keywords, symptoms, or disease names above.</h4>
                            </div>
                        }
                        {!firstLoad && (
                            <>
                                {loading && (
                                <main className="loading">
                                    <div className="spinner-border text-secondary mb-1" role="status">
                                    </div>
                                    <p className="spinner-text">Searching...</p>
                                </main>
                                )}
                                {numberOfResults > 0 && <ResultTable documents={searchResults} />}
                                {numberOfResults === 0 && (
                                <div className="no-results text-center mt-4">
                                    <h4 className="no-results-title">No Results Found</h4>
                                    <p className="no-results-message">
                                    We couldn't find any articles matching your search. <br />
                                    </p>
                                </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;