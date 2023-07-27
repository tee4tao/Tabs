import { useEffect, useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(3);
  const url = "https://course-api.com/react-tabs-project";
  let test = jobs.find((job) => {
    return job.order == value;
  });

  const fetchJobs = async () => {
    try {
      const resp = await fetch(url);
      if (resp.status >= 200 || resp.status <= 299) {
        let data = await resp.json();
        setJobs(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <main>
      <section className="tab-container">
        <div className="tab-btns">
          {jobs.map((job) => {
            const { id, company, order } = job;
            return (
              <button
                className={`tab-btn ${value == order ? `focus` : ``}`}
                key={id}
                onClick={(e) => {
                  if (e.target.textContent == company) {
                    setValue(order);
                  }
                }}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article>
          <h1 className="user-job">{test.title}</h1>
          <span className="user-name">{test.company}</span>
          <p className="user-experience">{test.dates}</p>
          <div className="user-infos">
            {test.duties.map((duty, index) => {
              return (
                <div className="info-container" key={index}>
                  <div className="icon">
                    <RiArrowRightDoubleFill />
                  </div>
                  <div className="user-info">{duty}</div>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
