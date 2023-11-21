import React from 'react'

import { Helmet } from 'react-helmet'
import './newLanding.css'

import FeatureCard from './feature-card.jsx'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Grouchy Queasy Newt</title>
        <meta property="og:title" content="Grouchy Queasy Newt" />
      </Helmet>
      <div className="home-header">
        <header data-thq="thq-navbar" className="home-navbar-interactive">
          <span className="home-logo">LAVOCATO</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
              <span>About</span>
              <span className="home-nav2">Features</span>
              <span className="home-nav3">Pricing</span>
              <span className="home-nav4">Team</span>
              <span className="home-nav5">Blog</span>
            </nav>
            <div className="home-buttons">
              <button className="home-login button">Login</button>
              <button className="home-register button">Register</button>
            </div>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu" className="home-mobile-menu">
            <div className="home-nav">
              <div className="home-top">
                <span className="home-logo1">LAVOCATO</span>
                <div data-thq="thq-close-menu" className="home-close-menu">
                  <svg viewBox="0 0 1024 1024" className="home-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav className="home-links1">
                <span className="home-nav11">About</span>
                <span className="home-nav21">Features</span>
                <span className="home-nav31">Pricing</span>
                <span className="home-nav41">Team</span>
                <span className="home-nav51">Blog</span>
              </nav>
              <div className="home-buttons1">
                <button className="home-login1 button">Login</button>
                <button className="home-register1 button">Register</button>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon04">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon06">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="home-icon08">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </header>
      </div>
      <div className="home-hero">
        <div className="home-hero1">
          <div className="home-container01">
            <h1 className="home-hero-heading heading1">Welcome to Lavocato</h1>
            <span className="home-hero-sub-heading">
              The Ultimate Lawyer Dashboard
            </span>
            <div className="home-btn-group">
              <button className="home-hero-button1 button">Get Started</button>
              <button className="home-hero-button2 button">Learn More →</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container02">
            <span className="home-text sectionTitle">
              <span style={{color:'goldenrod'}}>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
            Effortless Case Management

</h2>
            <span className="home-details-sub-heading">
            Simplify your legal practice with our intuitive platform. Seamlessly organize clients, cases, and tasks in one place, enhancing efficiency and streamlining your workload. Focus on what matters most - winning cases.


            </span>
          </div>
          <img
            alt="image"
            src="https://i.pinimg.com/564x/85/e9/af/85e9af635fae6aa657cd740b6e659f5d.jpg"
            className="home-details-image"
          />
        </div>
      </div>
      <div className="home-details2">
        <div className="home-details3">
          <img
            alt="image"
            src="https://i.pinimg.com/564x/90/f1/1e/90f11ee4f16f997bf21b56607a85fffd.jpg"
            className="home-details-image1"
          />
          <div className="home-container03">
            <span className="home-text03 sectionTitle">
              <span style={{color:'goldenrod'}}>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading1 heading2">
            Transparent Updates, Seamless Experience

</h2>
            <span className="home-details-sub-heading1">
            Create a transparent and engaging client experience with our update notifications. Keep your clients informed about case progress, important dates, and milestones. By fostering open communication, you build trust and loyalty, ensuring a seamless legal journey for your clients.
            </span>
          </div>
        </div>
      </div>
      <div className="home-details4">
        <div className="home-details5">
          <div className="home-container04">
            <span className="home-text06 sectionTitle">
              <span style={{color:'goldenrod'}}>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading2 heading2">
            Optimized Workflow & Productivity

</h2>
            <span className="home-details-sub-heading2">
            Boost your productivity with our comprehensive task management features. From deadlines to documents, our platform ensures nothing slips through the cracks. Stay on top of your game, meet deadlines, and achieve success with ease. Your legal practice, supercharged.
            </span>
          </div>
          <img
            alt="image"
            src="https://5.imimg.com/data5/SELLER/Default/2021/7/WY/PQ/LV/1117848/civil-lawyers-service.jpg"
            className="home-details-image2"
          />
        </div>
      </div>
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-features1">
            <div className="home-container05">
              <span className="home-text09 sectionTitle">
                <span style={{color:'goldenrod'}} >features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">Key Features</h2>
              <span className="home-features-sub-heading">
                Experience the power of Lavocato&apos;s lawyer dashboard with
                these exceptional features.
              </span>
            </div>
            <div className="home-container06">
              <FeatureCard
              
                Heading="User-friendly Interface"
                SubHeading="Easily navigate through the lawyer dashboard with a sleek and intuitive design."
              ></FeatureCard>
              <FeatureCard
                Heading="Secure Sign Up"
                SubHeading="Create your account with confidence, knowing that your personal information is protected."
              ></FeatureCard>
              <FeatureCard
                Heading="Efficient Case Management"
                SubHeading="Stay organized and track your cases effectively with our comprehensive case management system."
              ></FeatureCard>
              <FeatureCard
                Heading="Document Management"
                SubHeading="Upload, store, and access important legal documents securely in one centralized location."
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-pricing">
        <div className="home-pricing1">
          <div className="home-container07">
            <span className="home-text12 sectionTitle">
              <span style={{color:'goldenrod'}}>Pricing</span>
              <br></br>
            </span>
            <h2 className="home-pricing-heading heading2">
              Choose the Perfect Plan for You
            </h2>
            <span className="home-pricing-sub-heading">
              Select from our affordable pricing plans tailored to meet your
              needs
            </span>
          </div>
          <div className="home-container08">
            <div className="home-pricing-card">
              <div className="home-container09">
                <span className="home-text15 heading3" style={{color:"goldenrod"}}>Free</span>
                <span className="home-free-plan-description">
                  A short description for the free plan
                </span>
              </div>
              <div className="home-container10">
                <span className="home-text16">
                  <span>$</span>
                  <span></span>
                </span>
                <span className="home-free-plan-price">0</span>
              </div>
              <div className="home-container11">
                <div className="home-container12">
                  <span className="home-text19">✔</span>
                  <span className="home-free-plan-features">
                    Access to basic lawyer dashboard features
                  </span>
                </div>
                <div className="home-container13">
                  <span className="home-text20">✔</span>
                  <span className="home-free-plan-features1">
                    Limited storage capacity
                  </span>
                </div>
                <div className="home-container14">
                  <span className="home-text21">✔</span>
                  <span className="home-free-plan-features2">
                    No priority support
                  </span>
                </div>
                <div className="home-container15">
                  <span className="home-text22">✔</span>
                  <span className="home-free-plan-features3">
                    Advertisements displayed
                  </span>
                </div>
              </div>
              <button className="home-button button">Continue with Free</button>
            </div>
            <div className="home-pricing-card1">
              <div className="home-container16">
                <span className="home-text23 heading3" style={{color:"goldenrod"}}>BASIC</span>
                <span className="home-basic-plan-description">
                  A short description for the basic plan
                </span>
              </div>
              <div className="home-container17">
                <span className="home-text24">
                  <span>$</span>
                  <span></span>
                </span>
                <span className="home-basic-plan-pricing">7</span>
                <span className="home-text27">/ month</span>
              </div>
              <div className="home-container18">
                <div className="home-container19">
                  <span className="home-text28">✔</span>
                  <span className="home-text29">All features of FREE plan</span>
                </div>
                <div className="home-container20">
                  <span className="home-text30">✔</span>
                  <span className="home-basic-plan-features">
                    Access to advanced lawyer dashboard features
                  </span>
                </div>
                <div className="home-container21">
                  <span className="home-text31">✔</span>
                  <span className="home-basic-plan-features1">
                    Increased storage capacity
                  </span>
                </div>
                <div className="home-container22">
                  <span className="home-text32">✔</span>
                  <span className="home-basic-plan-features2">
                    Priority support
                  </span>
                </div>
                <div className="home-container23">
                  <span className="home-text33">✔</span>
                  <span className="home-basic-plan-features3">
                    No advertisements
                  </span>
                </div>
              </div>
              <button className="home-button1 button">
                Try the Basic plan
              </button>
            </div>
            <div className="home-pricing-card2">
              <div className="home-container24">
                <span className="home-text34 heading3">
                  <span style={{color:"goldenrod"}}>PRO</span>
                  <br></br>
                </span>
                <span className="home-pro-plan-description">
                  A short description for the pro plan
                </span>
              </div>
              <div className="home-container25">
                <span className="home-text37">
                  <span>$</span>
                  <span></span>
                </span>
                <span className="home-pro-plan-pricing">20</span>
                <span className="home-text40">/ month</span>
              </div>
              <div className="home-container26">
                <div className="home-container27">
                  <span className="home-text41">✔</span>
                  <span className="home-text42">
                     All features of BASIC plan
                  </span>
                </div>
                <div className="home-container28">
                  <span className="home-text43">✔</span>
                  <span className="home-pro-plan-features">
                    Access to premium lawyer dashboard features
                  </span>
                </div>
                <div className="home-container29">
                  <span className="home-text44">✔</span>
                  <span className="home-pro-plan-features1">
                    Unlimited storage capacity
                  </span>
                </div>
                <div className="home-container30">
                  <span className="home-text45">✔</span>
                  <span className="home-pro-plan-features2">
                    24/7 priority support
                  </span>
                </div>
              </div>
              <button className="home-button2 button">Try the PRO plan</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-gallery"></div>
      <div className="home-banner">
        <div className="home-banner1">
          <h1 className="home-banner-heading heading2">
            Empowering Lawyers with Efficiency
          </h1>
          <span className="home-banner-sub-heading">
            Discover the power of Lavocato&apos;s black and gold lawyer
            dashboard. Streamline your workflow, manage cases, and stay
            organized like never before.
          </span>
          <button className="home-banner-button button">Learn More</button>
        </div>
      </div>
      <div className="home-faq"></div>
      <div className="home-footer">
        <footer className="home-footer1">
          <div className="home-container31">
            <span className="home-logo2">LAVOCATO</span>
            <nav className="home-nav1 home-nav1">
              <span className="home-nav12">About</span>
              <span className="home-nav22">Features</span>
              <span className="home-nav32">Pricing</span>
              <span className="home-nav42">Team</span>
              <span className="home-nav52">Blog</span>
            </nav>
          </div>
          <div className="home-separator"></div>
          <div className="home-container32">
            <span className="home-text46">
              © 2023 myCompany, All Rights Reserved.
            </span>
            <div className="home-icon-group1">
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon10">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon12">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
              <svg viewBox="0 0 602.2582857142856 1024" className="home-icon14">
                <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
