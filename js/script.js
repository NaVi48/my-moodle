// Job data with enhanced structure
const jobs = [
    {
        companyName: "Tech Innovations Inc.",
        email: "careers@techinnovations.com",
        phone: "+1 (555) 123-4567",
        jobDescription: "Senior Software Engineer - Full Stack Development",
        companyLogo: "https://via.placeholder.com/150?text=Tech+Innovations"
    },
    {
        companyName: "Global Solutions Ltd.",
        email: "jobs@globalsolutions.com",
        phone: "+1 (555) 987-6543",
        jobDescription: "Data Scientist - Machine Learning Specialist",
        companyLogo: "https://via.placeholder.com/150?text=Global+Solutions"
    },
    {
        companyName: "Innovative Tech Corp",
        email: "careers@innovativetech.com",
        phone: "+1 (555) 456-7890",
        jobDescription: "Cloud Architecture Specialist",
        companyLogo: "https://via.placeholder.com/150?text=Innovative+Tech"
    }
];

// Function to display jobs
function displayJobs() {
    const container = document.getElementById('jobListings');
    container.innerHTML = ''; // Clear existing content

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.innerHTML = `
            <img src="${job.companyLogo}" alt="${job.companyName} Logo" class="company-logo">
            <h2>${job.companyName}</h2>
            <div class="job-details">
                <p><strong>Job Description:</strong> ${job.jobDescription}</p>
                <div class="contact-info">
                    <p><strong>Email:</strong> ${job.email}</p>
                    <p><strong>Phone:</strong> ${job.phone}</p>
                </div>
                <button class="apply-button" onclick="applyForJob('${job.companyName}')">Apply Now</button>
            </div>
        `;
        container.appendChild(jobCard);
    });
}

// Apply for job function
function applyForJob(companyName) {
    alert(`Application for ${companyName} job submitted!`);
    // In a real scenario, this would trigger an application process
}

// Load jobs when page loads
document.addEventListener('DOMContentLoaded', displayJobs);