import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState( [
    {
      title: "Frontend Developer",
      company: {
        name: "ABC Company",
      },
      location: {
        city: "New York",
        country: "United States",
      },
      isRemote: false,
    },
    {
      title: "Backend Developer",
      company: {
        name: "XYZ Company",
      },
      location: {
        city: "San Francisco",
        country: "United States"
      },
      isRemote: true,
    },
    {
      title: "Full-stack Developer",
      company: {
        name: "MNO Company",
      },
      location: {
        city: "London",
        country: "United Kingdom",
      },
      isRemote: false,
    },
  ],);

  useEffect(() => {
    axios.post('https://api.openai.com/v1/playground/gpt-3/jobs', {
      prompt: `jobs`,
      max_tokens: 1024,
      temperature: 0.7,
      n: 1,
      stop: ['>>>']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY_HERE'
      }
    })
      .then(res => {
        const data = JSON.parse(res.data.choices[0].text.replace(/'/g, '"'));
        setJobs(data.jobs);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <table>
        <thead>
          <tr className='first'>
            <th>Title</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Remote</th>
            <th>Link to Job Post</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{job.title}</td>
              <td>{job.company.name}</td>
              <td>{job.locations[0].city}, {job.locations[0].country}</td>
              <td>{job.remote ? 'Yes' : 'No'}</td>
              <td><a href={job.url} target='_blank' rel='noreferrer'>Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
