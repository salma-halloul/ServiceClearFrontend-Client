"use client"
import { fetchReviews } from "@/redux/actions/reviewAction";
import { RootState, useAppDispatch } from "@/redux/store";
import { Star } from "lucide-react";
import Slider from "react-slick";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";



export default function Testimonials() {
    const dispatch = useAppDispatch();
    const reviews = useSelector((state: RootState) => state.review.reviews);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchReviews());
            hasFetched.current = true;
        }
    }, [dispatch]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
      };
    

    return (
        <section className="py-20">
            <div className=" mx-auto lg:px-20 px-10">
                <h3 className="text-primary font-semibold text-center text-lg mb-2">Testomonials</h3>
                <h2 className="text-4xl font-bold text-secondary text-center mb-10 leading-tight">
                    What our customer says
                </h2>
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4">
                            <div className="border rounded-md shadow-sm">
                                <div className="bg-white p-4 min-h-48 max-h-64 overflow-y-auto">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4">{review.comment}</p>
                                </div>
                                <div className="bg-primary rounded-b-md">
                                    <p className="font-semibold text-white p-3">{review.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}