import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: true, // make it loop continuously
    speed: 500, // slide transition duration
    autoplay: true,
    autoplaySpeed: 1500, // ⏱️ 1.5 seconds between slides
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="">
        {/* Header */}
        <header className="flex tc items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-lg"
            />
            <h1 className="md:text-2xl text-yellow-400 font-serif font-bold">
              SkillNova
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/courses"
                  className="bg-transparent border border-white transition duration-300 text-bolder inline-block text-white text-xs md:text-lg md:py-2 md:px-4 p-2 rounded mr-2"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-yellow-400 text-black p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <section className="text-center bg-black py-20">
          <h1 className="text-4xl font-semibold font-serif text-yellow-400">
            Welcome to SkillNova
          </h1>

          <br />
          <p className="text-white">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              to={"https://www.youtube.com"}
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
          </div>
        </section>
        <section className="p-10 bg-black">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-72">
                  {/* Image */}
                  <img
                    src={course.image?.url || "/default-course.jpg"}
                    alt={course.title}
                    className="h-36 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between text-center text-white flex-1">
                    <h2 className="text-lg font-semibold">{course.title}</h2>

                    <p className="text-sm text-gray-300 mt-2 line-clamp-1">
                      {course.description}
                    </p>

                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-4 bg-green-500 text-white py-2 px-5 rounded hover:bg-white hover:text-black transition duration-300 text-bolder inline-block"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* <hr /> */}
        {/* Footer */}
        <footer className=" tc">
          <br />
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4">
                <img src={logo} alt="" className="w-10 h-10 ml-8 rounded-lg" />
                <h1 className="text-2xl text-yellow-400 font-bold">
                  SkillNova
                </h1>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="text-white">
                  Skillnova empowers learners with expert-led courses,
                  interactive content, and a seamless experience to master
                  skills and grow careers.
                </p>
                <br />
                <p className="mb-2">
                  <span className="text-yellow-400">Follow us</span>
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-2xl text-white hover:text-blue-400 duration-300" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-2xl text-white hover:text-pink-600 duration-300" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-2xl text-white hover:text-blue-600 duration-300" />
                  </a>
                  <br />
                  <br />
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg text-white font-semibold md:mb-4">
                connects
              </h3>
              <ul className=" space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube - Learn
                  </a>
                </li>

                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram - Learn
                  </a>
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub - Learn
                  </a>
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg text-white font-semibold mb-4">
                copyrights &#169; 2024
              </h3>
              <ul className=" space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://example.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://example.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  <a
                    href="https://example.com/refund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    Refund & Cancellation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
