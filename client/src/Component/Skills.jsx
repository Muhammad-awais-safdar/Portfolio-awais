import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import api from "../services/api";


const SkillCircle = ({ percentage, name }) => {
  const radius = 90;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="single-skill text-center mb-30">
      <div
        style={{
          position: "relative",
          width: radius * 2,
          height: radius * 2,
          margin: "0 auto",
        }}
      >
        <svg width={radius * 2} height={radius * 2}>
          <circle
            stroke="#9b9db1"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="#80db66"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: "26px",
            fontWeight: "bold",
          }}
        >
          <CountUp start={0} end={percentage} duration={1.8}>
            {({ countUpRef }) => (
              <>
                <span ref={countUpRef} />%
              </>
            )}
          </CountUp>
        </div>
      </div>
      <h4 className="mt-15 text-center">{name}</h4>
    </div>
  );
};


export default function Skills() {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const data = await api.getSkills();
        setSkillsData(data);
      } catch (error) {
        console.error('Error fetching skills data:', error);
        // Fallback to local JSON if API fails
        const fallbackData = await import('../data/skills.json');
        setSkillsData(fallbackData.default);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div
      id="skills"
      className="skill-area over-hidden position-relative pt-130 pb-110"
    >
      <div className="marquee-w mb-125">
        <div className="marquee">
          <span className="pl-4">Senior Website Developer from New York *</span>
          <span className="pl-4">Senior Website Developer from New York *</span>
        </div>
        <div className="marquee marquee2 pb-1">
          <span className="pl-4">
            I’m Open for new projects * Let’s Work Together *
          </span>
          <span className="pl-4">
            I’m Open for new projects * Let’s Work Together *
          </span>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-start justify-content-center">
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
            <div className="position-relative">
              <div className="title mb-50">
                <span className="theme-color text-uppercase d-block mb-6">
                  My Skill
                </span>
                <h2 className="mb-25">Growing Over Times</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus Sed ut perspiciatis
                  unde omnis iste natus kobita tumi sopno charini hoye khbor nio
                  na sit voluptatem accusantium dolore.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 offset-xl-1 col-md-12 col-sm-12 col-12">
            <div className="row justify-content-center mt-10">
              {skillsData.map((skill, index) => (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-9"
                >
                  <SkillCircle
                    percentage={skill.percentage}
                    name={skill.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="skill-text-style position-absolute z-index-1 d-none d-md-inline-block">
        <span className="d-inline-block section-text-color">Skills</span>
      </div>
    </div>
  );
}
