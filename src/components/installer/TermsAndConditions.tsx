import React from 'react';

interface TermsAndConditionsProps {
  onAccept: () => void;
  onDecline: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-dark-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-school-green mb-6">Terms and Conditions</h2>
      
      <div className="prose dark:prose-invert max-h-96 overflow-y-auto mb-6 space-y-4">
        <section>
          <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
          <p>
            Welcome to KHSK TimeTable, developed by NextHomeLabs, a leading technology company 
            based in Kampala, Uganda, specializing in AI and blockchain solutions. By installing 
            this software, you agree to these terms and conditions.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">2. License Grant</h3>
          <p>
            NextHomeLabs grants you a non-exclusive, non-transferable license to use KHSK 
            TimeTable software for your school's internal operations.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">3. Intellectual Property</h3>
          <p>
            All intellectual property rights in the software, including AI algorithms and 
            blockchain implementations, belong to NextHomeLabs. You may not copy, modify, 
            or reverse engineer the software.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">4. Data Usage</h3>
          <p>
            The software may collect usage data to improve our AI systems. All data collection 
            complies with relevant privacy laws and our privacy policy.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">5. Support</h3>
          <p>
            Technical support is provided by NextHomeLabs through our office in Kampala. 
            Contact us at support@nexthomelabs.com for assistance.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">6. Termination</h3>
          <p>
            NextHomeLabs reserves the right to terminate this license if you violate these 
            terms. Upon termination, you must cease using the software.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">7. Governing Law</h3>
          <p>
            These terms are governed by the laws of Uganda. Any disputes shall be resolved 
            in the courts of Kampala.
          </p>
        </section>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onDecline}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-school-green text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;