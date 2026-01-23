import React, { useState } from 'react';

const Contact = () => {
  // State to handle submission status
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(event.target);

    // --- IMPORTANT: Access Key ---
    formData.append("access_key", "100570b9-c60e-4d92-9749-b151b4b02fc6"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset(); // Clear form after sending
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Submission Error", error);
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <footer id="contact" className="relative pt-32 pb-10 px-6 overflow-hidden" data-color="#22d3ee">
      <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
            <div className="reveal-up lg:w-1/2">
              <h2 className="text-5xl md:text-8xl font-black text-white font-display mb-8 leading-none">
                LET'S BUILD <br /> <span className="highlight-text">THE FUTURE.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md">
                Ready to collaborate? Fill out the form or reach out to me directly.
              </p>
              <div className="flex flex-col gap-4 text-slate-300 font-mono text-sm">
                <div className="flex items-center gap-3"><i className="fas fa-envelope highlight-text"></i> zirmanvictory@gmail.com</div>
              </div>
            </div>

            <div className="reveal-up lg:w-1/2">
                <form className="glass-panel p-8 rounded-2xl relative overflow-hidden" onSubmit={onSubmit}>
                  
                  {/* --- ANTI-ROBOT FEATURE (Honeypot) --- */}
                  {/* This input is hidden. If a bot fills it, the email won't be sent. */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
                  {/* ----------------------------------- */}

                  <div className="relative mb-6">
                      <input type="text" name="name" className="input-field w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-[var(--primary-color)] transition-all placeholder-transparent" placeholder=" " required />
                      <label className="input-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all">Full Name</label>
                  </div>

                  <div className="relative mb-6">
                      <input type="email" name="email" className="input-field w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-[var(--primary-color)] transition-all placeholder-transparent" placeholder=" " required />
                      <label className="input-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all">Email Address</label>
                  </div>

                  <div className="relative mb-6">
                      <textarea name="message" rows="4" className="input-field w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-[var(--primary-color)] transition-all placeholder-transparent resize-none" placeholder=" " required></textarea>
                      <label className="input-label absolute left-4 top-4 text-slate-400 pointer-events-none transition-all">Your Message</label>
                  </div>

                  <button type="submit" className="w-full py-4 rounded-xl font-bold text-[#020617] bg-[var(--primary-color)] transition-all duration-300 relative overflow-hidden group">
                      <span className="relative z-10 flex justify-center items-center gap-2">
                        {result ? result : <>Send Message <i className="fas fa-paper-plane"></i></>}
                      </span>
                  </button>
                </form>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex justify-between items-center text-sm text-slate-600 font-mono">
            <p>&copy; 2025 Salman Rizky. Engineered to Win.</p>
          </div>
      </div>
    </footer>
  );
};

export default Contact;