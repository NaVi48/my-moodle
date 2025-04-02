// Job data with enhanced structure
const jobs = [
    {
        companyName: "Tech Innovations Inc.",
        email: "careers@techinnovations.com",
        phone: "+1 (555) 123-4567",
        jobDescription: "Senior Software Engineer - Full Stack Development",
        companyLogo: "https://imgs.search.brave.com/PPD6j2k8yZ31g_QjvHxFPRIORX1zppwhYZ6fiLzJb00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTgv/MDUvMzAxNzU1MTQv/MzEwMi03Njh4NTkx/LnBuZw"
    },
    {
        companyName: "Global Solutions Ltd.",
        email: "jobs@globalsolutions.com",
        phone: "+1 (555) 987-6543",
        jobDescription: "Data Scientist - Machine Learning Specialist",
        companyLogo: "https://imgs.search.brave.com/flG-ELv58N2Izk7zGnaqA2M4FHfNxXrhLXd1vEdLS6M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2xvYmFsdHMuY29t/L2ltYWdlcy9nbG9i/YWwtbGluay1jb21t/dW5pY2F0aW9ucy1o/b21lcGFnZS1sb2dv/LnBuZws"
    },
    {
        companyName: "Innovative Tech Corp",
        email: "careers@innovativetech.com",
        phone: "+1 (555) 456-7890",
        jobDescription: "Cloud Architecture Specialist",
        companyLogo: "https://imgs.search.brave.com/MROBAIODmrKEwcIgpPyzGL9Qlz4cRicSfobW6PFMNOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC81MS82Mi9p/bm5vdmF0aW9uLXRl/Y2hub2xvZ3ktY29t/cGFueS1hYnN0cmFj/dC1sb2dvLXZlY3Rv/ci0xOTUzNTE2Mi5q/cGc"
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
