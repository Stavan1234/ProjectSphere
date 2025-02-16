import { useState, useEffect } from "react";
import supabase from "../config/ProjectSphereClient"; // ✅ Use friend's database
import { useParams } from "next/navigation";

const Comments = () => {
    const { id: projectId } = useParams(); // Get project ID from URL
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("desc"); // Sort by highest rating first

    const fetchReviews = async () => {
        setLoading(true);
        console.log("Fetching reviews for project ID:", projectId);
    
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("project_id", projectId)
            .order("rating", { ascending: sortOrder === "asc" });
    
        if (error) {
            console.error("Error fetching comments:", error);
            alert("Error fetching comments. Check console.");
        } else {
            console.log("Fetched comments:", data);
            setReviews(data);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        if (projectId) {
            fetchReviews();
        }
    }, [projectId, sortOrder]);

    const handleSubmit = async () => {
        if (!username || !comment || selectedRating === 0) {
            alert("Please provide a name, review, and rating!");
            return;
        }

        const newReview = {
            project_id: projectId,
            username,
            comment,
            rating: selectedRating,
            created_at: new Date().toISOString(),
        };

        const { error } = await supabase.from("comments").insert([newReview]); // ✅ Use friend's Supabase

        if (error) {
            console.error("Error submitting review:", error);
        } else {
            setUsername("");
            setComment("");
            setSelectedRating(0);
            fetchReviews();
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-100 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold text-center mb-4">Leave a Review</h2>
                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`text-2xl cursor-pointer transition-transform transform ${
                                value <= selectedRating ? "text-yellow-400 scale-110" : "text-gray-300"
                            }`}
                            onClick={() => setSelectedRating(value)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <textarea
                    placeholder="Write your review..."
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    className="w-full bg-green-500 text-white p-2 rounded font-bold hover:bg-green-600 transition"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            {/* Sorting Button */}
            <div className="mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition"
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                >
                    Sort by Rating: {sortOrder === "desc" ? "Highest First" : "Lowest First"}
                </button>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full mt-6">
                <h2 className="text-xl font-bold text-center mb-4">User Reviews</h2>
                {loading ? (
                    <p className="text-center text-gray-500">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 py-2">
                            <div className="flex justify-between font-bold text-gray-700">
                                <span>{review.username}</span>
                                <span>{"★".repeat(review.rating)}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;
