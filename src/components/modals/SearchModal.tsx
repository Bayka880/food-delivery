import React from "react";
import { Modal } from "react-bootstrap";
import { useSearch } from "../../contexts/SearchCtx";

export default function SearchModal(props: any) {
  const { searchTerm, setSearchTerm } = useSearch();

  function searchSubmit(e: any) {
    setSearchTerm(e.target[0].value);
    e.preventDefault();
    props.navigate("/search");
    props.handleCloseSearch();
  }

  return (
    <div>
      <Modal show={props.searchModal} onHide={props.handleCloseSearch}>
        <Modal.Body>
          <div className="search-box">
            <form action="search" onSubmit={searchSubmit}>
              <input type="text" name="search" id="search" placeholder="Хайх" />

              <button type="submit" id="search-button">
                Хайх
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
function setSearchTerm(value: any) {
  throw new Error("Function not implemented.");
}
