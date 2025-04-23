const AboutSection = () => {
  return (
    <div id="about-section" className="section">
      <div className="search-container">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          <i className="fas fa-info-circle text-rose-500"></i> About CookAI
        </h2>
        <div className="about-content">
          <p className="text-gray-700 mb-4">
            CookAI is an AI-powered recipe suggestion system that helps you find
            the perfect recipe based on your available ingredients and dietary
            preferences.
          </p>
          <p className="text-gray-700 mb-4">
            Our system uses advanced AI technology to match your ingredients
            with delicious recipes, taking into account your dietary
            restrictions and calorie requirements.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you&apos;re a seasoned chef or a beginner in the kitchen,
            CookAI makes it easy to discover new recipes and reduce food waste
            by using ingredients you already have.
          </p>
          <p className="text-gray-700">
            Try CookAI today and transform your cooking experience. Simply
            select the ingredients you have, apply any dietary filters, and let
            our AI do the rest!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
