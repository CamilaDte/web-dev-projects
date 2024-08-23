
import React, { useState, useEffect, useRef } from 'react';
import '../components/book.css'
import HTMLFlipBook from "react-pageflip";

export const FlipBook = () => {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [orientation, setOrientation] = useState("landscape");
  const [state, setState] = useState("read");
  const [pages, setPages] = useState([]);
  const flipBookRef = useRef(null);

  useEffect(() => {
    const newPages = [];
    for (let i = 0; i < 100; i++) {
      newPages.push({
        image: `${i + 1}.jpg`,
        number: i + 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna."
      });
    }
    setPages(newPages);
    setTotalPage(newPages.length);
  }, []);

  const nextButtonClick = () => {
    flipBookRef.current.getPageFlip().flipNext();
  };

  const prevButtonClick = () => {
    flipBookRef.current.getPageFlip().flipPrev();
  };

  const onPage = (e) => {
    setPage(e.data);
  };

  const onChangeOrientation = (e) => {
    setOrientation(e.data);
  };

  const onChangeState = (e) => {
    setState(e.data);
  };

  useEffect(() => {
    const flipBook = flipBookRef.current;
    const pages = flipBook.querySelectorAll('.page');

    const flip = (e) => {
      const page = e.target.closest('.page');
      const index = [...pages].indexOf(page);

      // Flip the page
      page.classList.add('flipping');
      setTimeout(() => {
        page.classList.remove('flipping');
      }, 1000);

      // Update the current page
      setPage(index + (e.target === page ? 1 : -1));
    };

    // Add event listeners for flipping
    pages.forEach(page => {
      page.addEventListener('click', flip);
    });

    return () => {
      pages.forEach(page => {
        page.removeEventListener('click', flip);
      });
    };
  }, [flipBookRef, pages]);

  return (
    <div>
      <div className="container-md" style={{ position: "relative" }}>
        <HTMLFlipBook
          pages={pages}
          width={550}
          height={733}
          ref={flipBookRef}
          onPage={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
        />
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-info btn-sm btn-prev"
              onClick={prevButtonClick}
            >
              Previous page
            </button>
            [<span>{page + 1}</span> of <span>{totalPage}</span>]
            <button
              type="button"
              className="btn btn-info btn-sm btn-next"
              onClick={nextButtonClick}
            >
              Next page
            </button>
          </div>
          <div className="col-md-6">
            State: <i>{state}</i>, orientation: <i>{orientation}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

