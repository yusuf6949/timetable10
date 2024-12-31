import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <p className="text-sm text-gray-300">
        To request access to KHSK TimeTable, please contact:
        <br /><br />
        IT Department<br />
        Email: admin@kinaawahigh.co.ug<br />
        Phone: +256 784 217 999
      </p>
    </div>
  );
};

export default ContactInfo;