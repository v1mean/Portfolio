export const projectDetails = {
  HomeSweet: (
    <div className="project-showcase" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <section>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎯 The Problem
          </h3>
          <p>
            University students often struggle to find safe, affordable, and conveniently located housing near their campuses. Current solutions are scattered across informal social media groups, leading to unverified listings, hidden fees, and stressful room-hunting experiences.
          </p>
        </section>

        <section>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💡 The Solution
          </h3>
          <p>
            HomeSweet provides a centralized, student-focused housing platform. It introduces a unique <strong>University Zoning System</strong> to filter nearby properties and a robust <strong>Identity Verification</strong> process to ensure safety and transparency for both students and landlords.
          </p>
        </section>
      </div>

      <section style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ✨ Core Features
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>University Zoning</h4>
            <p style={{ fontSize: '0.95rem' }}>Location-based matching for specific campus radii.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>Roommate Matching</h4>
            <p style={{ fontSize: '0.95rem' }}>AI-driven compatibility pairing for shared living.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>Secure Chat System</h4>
            <p style={{ fontSize: '0.95rem' }}>Direct messaging unlocks only after mutual match requests.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.25rem', fontSize: '1rem' }}>Verified Listings</h4>
            <p style={{ fontSize: '0.95rem' }}>Identity checks and trust scores prevent rental fraud.</p>
          </div>
        </div>
      </section>

    </div>
  ),
  "Developer Portfolio": (
    <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        A personal showcase designed to leave a lasting impression. Built from the ground up with a focus on premium aesthetics, this developer portfolio features dynamic 3D loading animations, smooth page transitions, and an incredibly detailed macOS browser mockup for presenting projects without cropping or letterboxing.
      </p>

      <h3 style={{ color: 'var(--text)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--accent-primary)' }}>✦</span> Core Features
      </h3>
      
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Immersive Design</h4>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>Custom CSS animations, glowing effects, and a highly polished dark mode UI inspired by modern terminal interfaces.</p>
        </div>
        <div style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Smart Mockups</h4>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>Projects are presented in a dynamic, floating macOS browser viewport that scales perfectly to any image dimension.</p>
        </div>
        <div style={{ background: 'var(--surface-2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Agentic Capabilities</h4>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>Configured with custom .agents rules to automatically prompt for new screenshots whenever a new project is created.</p>
        </div>
      </section>

      <h3 style={{ color: 'var(--text)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--accent-primary)' }}>✦</span> The Development Process
      </h3>
      <p style={{ marginBottom: '2rem' }}>
        The goal of this project was to step away from basic component libraries and craft a truly bespoke experience. Every element, from the 3D atomic orbital loading spinner to the custom-built image preloading mechanism, was meticulously designed to ensure a flawless 60fps experience with zero layout shift.
      </p>
    </div>
  )
};
