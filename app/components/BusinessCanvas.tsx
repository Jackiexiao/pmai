'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Target, Briefcase, MessageSquare, Truck, 
  DollarSign, Building, Zap, PieChart
} from 'lucide-react';

type CanvasData = {
  [key: string]: Array<{ point: string, content: string }>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const moduleIcons: { [key: string]: React.ReactNode } = {
  '客户细分': <Users className="w-6 h-6" />,
  '价值主张': <Target className="w-6 h-6" />,
  '渠道通路': <Truck className="w-6 h-6" />,
  '客户关系': <MessageSquare className="w-6 h-6" />,
  '收入来源': <DollarSign className="w-6 h-6" />,
  '核心资源': <Building className="w-6 h-6" />,
  '关键业务': <Briefcase className="w-6 h-6" />,
  '重要合作': <Zap className="w-6 h-6" />,
  '成本结构': <PieChart className="w-6 h-6" />,
};

export default function BusinessCanvas({ idea, data }: { idea: string, data: CanvasData }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Object.entries(data).map(([module, points]) => (
        <motion.div
          key={module}
          variants={itemVariants}
          className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4 pb-2 border-b border-gray-600">
            <div className="mr-3 text-blue-300">
              {moduleIcons[module] || <Briefcase className="w-6 h-6" />}
            </div>
            <h2 className="text-xl font-semibold text-white">
              {module}
            </h2>
          </div>
          <ul className="space-y-2">
            {points.map(({ point }, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/idea/${encodeURIComponent(idea)}/${encodeURIComponent(module)}/${encodeURIComponent(point)}`}
                  className="text-blue-300 hover:text-blue-100 transition-colors duration-200"
                >
                  {point}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
