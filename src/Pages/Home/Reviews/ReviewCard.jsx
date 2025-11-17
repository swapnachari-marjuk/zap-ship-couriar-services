import { Quote } from "lucide-react";
import React from "react";

const ReviewCard = ({ review }) => {
  const { userName, review: userReview, user_photoURL, user_email } = review;
  console.log(review);
  return (
    <div>
      <div className="max-w-sm mx-auto p-6 rounded-xl bg-[#ddedae] relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10">
          {/* Quote icon */}
          <Quote className="w-8 h-8 text-gray-500 mb-3" />

          {/* Text */}
          <p className="text-primary-content leading-relaxed">{userReview}</p>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Author section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full">
              <img src={user_photoURL} alt="" />
            </div>

            <div>
              <h3 className="font-semibold text-[#0F3D3E]">{userName}</h3>
              <p className="text-gray-600 text-sm">{user_email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
