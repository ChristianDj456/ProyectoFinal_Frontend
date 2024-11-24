import React from "react";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-black shadow-lg p-4  items-center">
            <Dashboard />

            <Footer />
        </div>
    );
};

export default HomePage;
