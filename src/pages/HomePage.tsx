import React from "react";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
    return (
        <div className="min-w-screen min-h-screen bg-pureWhite-100 text-black shadow-lg p-4 items-center">
            <Dashboard />
            
            <Footer />
        </div>
    );
};

export default HomePage;
