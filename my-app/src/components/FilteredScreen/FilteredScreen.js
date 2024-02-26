import React from 'react';
import './FilteredScreen.css'; 

const FilteredScreen = ({ numberOfResumes, data }) => {
    console.log(data.relevance_scores);
    const { relevance_scores } = data;
    const names = Object.keys(relevance_scores);
    const relevanceScores = Object.values(relevance_scores);

    const recommendedNames = [];
    const recommendedScores = [];
    const notRecommendedNames = [];
    const notRecommendedScores = [];

    names.forEach((name, index) => {
        if (relevanceScores[index] >= 10) {
            recommendedNames.push(name);
            recommendedScores.push(relevanceScores[index]);
        } else if (relevanceScores[index] < 10) {
            notRecommendedNames.push(name);
            notRecommendedScores.push(relevanceScores[index]);
        }
    });


  return (
    <div className="final-screen">
      <div className="heading">
        {numberOfResumes > 0 ? `${numberOfResumes} resumes filtered` : 'No resumes found'}
      </div>
      <div className="final-screen">
            <hr className="divider" />
            <div className="container">
                <div className="left">
                    <h2>Recommended Profiles</h2>
                    <ul>
                        {recommendedNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                <div className="right">
                    <h2>Resumes fit for the role</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Relevance Score (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendedNames.map((name, index) => (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{recommendedScores[index]}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container">
            <div className="left">
            <div className="not-recommended">
                <h2>Not Recommended Profiles</h2>
                <ul>
                    {notRecommendedNames.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            </div>
            <div className="right">
                    <h2>Resumes not fit for the role</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Relevance Score (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notRecommendedNames.map((name, index) => (
                                <tr key={index}>
                                    <td>{name}</td>
                                    <td>{notRecommendedScores[index]}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
        </div>
</div>
);}
 
export default FilteredScreen;
