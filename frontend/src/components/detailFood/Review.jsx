import React, { useState, useEffect, useContext } from "react";
import RatingLayout from "../ui/ratingLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ratingApi from "@/apis/ratingApi";
import { useParams } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import { Button, Dropdown, Menu } from "antd";
import { FaFontAwesome, FaStar } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Review({ foodId }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const { userData } = useContext(AuthContext);
  // const [list, setList] = useState([])
  const [page, setPage] = useState(1);
  const limit = 5;
  const [editingRatingId, setEditingRatingId] = useState(null);

  const getReviewsByFoodId = async () => {
    const response = await ratingApi.getRatingByFoodId(page, limit, foodId);
    // console.log(response.data)
    if (response.status === "success") {
      setReviewList(response.data);
    }
    // console.log("user:", userData)
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRatingContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleRatingSubmit = async () => {
    if (!rating || !content) {
      alert("Please provide both a rating and a comment.");
      return;
    }
    try {
      const response = await ratingApi.addRating(userData?.userId, foodId, content, rating);
      if (response.status === "success") {
        alert("Rating submitted successfully!");
        setContent("");
        setRating(0);
        getReviewsByFoodId();
      } else {
        alert("Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleDelete = async (ratingId) => {
    // console.log("Rate:",ratingId)
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      try {
        const response = await ratingApi.deleteRating(ratingId);
        if (response.status === "success") {
          alert("Review deleted successfully!");
          getReviewsByFoodId();
        } else {
          alert("Failed to delete the review.");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("An error occurred while deleting the review. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (foodId) {
      getReviewsByFoodId();
    }
  }, [page, foodId]);
  const next = () => {
    if (reviewList.length === limit) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const previous = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div>
        <div className="comment-form py-3 flex flex-col gap-3">
          <div className="top-comment  flex justify-between items-center">
            <h3>{reviewList.length} Comments</h3>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">Most Recent</Menu.Item>
                  <Menu.Item key="2">Highest Rated</Menu.Item>
                </Menu>
              }
            >
              <Button>Sort by ▼</Button>
            </Dropdown>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <FaStar
                  key={el}
                  onClick={() => handleRatingChange(el)}
                  className={`cursor-pointer text-2xl ${rating >= el ? "text-yellow-500" : "text-gray-500"}`}
                />
              );
            })}
          </div>
          {/* Example form elements */}
          <div className="form w-full">
            <textarea
              value={content}
              onChange={handleRatingContentChange}
              placeholder="Write your comment here..."
              className="border h-[150px] p-2 w-full"
            />
          </div>
          <div
            onClick={handleRatingSubmit}
            className="w-[100px] text-center cursor-pointer text-white font-semibold py-2 bg-primary-color inline-block rounded-md "
          >
            Đánh giá
          </div>
        </div>
        {reviewList.map((item, idx) => {
          return (
            <div div key={`review-${idx}`}>
              <div className="flex max-w-full border-b-[1px] pb-4 mt-5 justify-between" key={item.RatingId}>
                {/* <img className='rounded-full w-10 h-10 object-cover' src={item.avatar} /> */}
                <div className="items-center ml-3">
                  <div className="mb-3">
                    <div className="flex items-center">
                      {item.User ? (
                        <img
                          className="rounded-full w-10 h-10 object-cover"
                          src={item.User.Avatar}
                          alt={`${item.User.Username}'s Avatar`}
                        />
                      ) : (
                        <div className="rounded-full w-10 h-10 bg-gray-300" /> // Placeholder if Avatar is missing
                      )}
                      <RatingLayout rating={item.ratingValue} no={true} style="w-4 h-4" />
                    </div>
                    <p className="text-xs mt-[-4px]">{item.date}</p>
                  </div>
                  <p className="text-[18px]">{item.content}</p>
                  {item.reply ? (
                    <div className=" mt-3  border-[1px] w-fit p-2 border-orange-200">
                      {/* <a href='' className='flex items-center mb-2 w-fit'>
                                        <img className='rounded-full w-7 h-7 object-cover border-slate-200 border-[0.2px]' src={props.store.avatar} />
                                        <h3 className='text-[16px] ml-2 font-semibold text-gray-500'>{props.store.name}</h3>
                                    </a> */}
                      <p className="ml-9 text-[18px]">{item.reply}</p>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                {item.userId === userData.userId && (
                  <div className="flex space-x-2 mt-2">
                    <button onClick={() => handleUpdate(item.ratingId)} className="text-blue-500 flex items-center">
                      <FaEdit className="mr-1" />
                    </button>
                    <button onClick={() => handleDelete(item.ratingId)} className="text-red-500">
                      <FaTrashAlt />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Pagination className={"pt-2 pb-3"}>
        <PaginationContent>
          {page > 1 ? (
            <PaginationItem>
              <PaginationPrevious className={"cursor-pointer"} onClick={previous} />
            </PaginationItem>
          ) : (
            <div />
          )}

          <PaginationItem>
            <PaginationLink className={"font-semibold bg-gray-200 h-7"}>{page}</PaginationLink>
          </PaginationItem>
          {/* {(reviewList.length-page*10)>0?(
                    <PaginationItem>
                    <PaginationNext className={'cursor-pointer'}
                    onClick={next} />
                </PaginationItem>
                ):(<div/>)} */}
          {reviewList.length > limit && (
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={next} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
