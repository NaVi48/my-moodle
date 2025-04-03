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
        companyLogo: "https://imgs.search.brave.com/ARyIHuNviTh9BojKKTwL7vFjC1XkvnfjVafK9jFnapw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pdGUt/cHJvZC1jZG4tZW5k/LmF6dXJlZWRnZS5u/ZXQvc2hhcmVkbWVk/aWEvbWluaW5naW5k/YWJhL21lZGlhL2Fz/c2V0cy9kZWJzd2Fu/YV93ZWJsb2dvLTMw/MHB4LW1pbi5wbmc_/ZXh0PS5wbmc"
    },
    {
        companyName: "Innovative Tech Corp",
        email: "careers@innovativetech.com",
        phone: "+1 (555) 456-7890",
        jobDescription: "Cloud Architecture Specialist",
        companyLogo: "https://imgs.search.brave.com/MROBAIODmrKEwcIgpPyzGL9Qlz4cRicSfobW6PFMNOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC81MS82Mi9p/bm5vdmF0aW9uLXRl/Y2hub2xvZ3ktY29t/cGFueS1hYnN0cmFj/dC1sb2dvLXZlY3Rv/ci0xOTUzNTE2Mi5q/cGc"
    },
    {
        companyName: "Tech Innovations Inc.",
        email: "careers@techinnovations.com",
        phone: "+1 (555) 123-4567",
        jobDescription: "Senior Software Engineer - Full Stack Development",
        companyLogo: "https://imgs.search.brave.com/rFH511phsDfkK8OLSWAOQkWfvFs69MUX-G1QzAo3-KE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaXJl/Y3RvcnkuYWZyaWNh/LWJ1c2luZXNzLmNv/bS9hc3NldHMvdXBs/b2Fkcy9sb2dvL2Jt/Yy1ib3Rzd2FuYS5q/cGc"
    },
    {
        companyName: "Global Solutions Ltd.",
        email: "jobs@globalsolutions.com",
        phone: "+1 (555) 987-6543",
        jobDescription: "Data Scientist - Machine Learning Specialist",
        companyLogo: "https://imgs.search.brave.com/587o20P_qQNuafBfyYW9T4_3-Gl_6PcN1saz6P9ztb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2ZuYi1m/aXJzdC1uYXRpb25h/bC1iYW5rLW5ldy0y/MDIyMjA5Ny5sb2dv/d2lrLmNvbS53ZWJw"
    },
    {
        companyName: "Innovative Tech Corp",
        email: "careers@innovativetech.com",
        phone: "+1 (555) 456-7890",
        jobDescription: "Cloud Architecture Specialist",
        companyLogo: "https://imgs.search.brave.com/bzm0p5YduJ3wDsn6hpJNf5eZDPA7jaZ3KanxE6yLPYw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2lu/dGVybmF0aW9uYWwt/ZW50ZXJ0YWlubWVu/dC1wcm9qZWN0L2lt/YWdlcy82LzY3L0Jv/dHN3YW5hX1RlbGV2/aXNpb24ucG5nL3Jl/dmlzaW9uL2xhdGVz/dC9zY2FsZS10by13/aWR0aC1kb3duLzEy/MD9jYj0yMDIzMDYx/NjEzMzg0MA"
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
