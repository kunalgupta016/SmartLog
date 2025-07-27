import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { useTransactions } from "./TransactionContext";
import { motion } from "framer-motion";

const COLORS = [
  "#0BA775", // Soft green
  "#E53434", // Soft red
  "#2C68E7", // Blue
  "#00C48F", // Indigo
  "#22c55e", // Light green
  "#f97316", // Orange
  "#864BFD", // Cyan
  "#a855f7", // Violet
];

const VisualReports = () => {
  const { transactions } = useTransactions();

  const expenseData = transactions
    .filter(t => t.type === "Expense")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  const incomeData = transactions
    .filter(t => t.type === "Income")
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white p-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-12 text-center text-indigo-600 drop-shadow-sm">
        Visual Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Expense Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-red-500 mb-4">Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Income Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-green-500 mb-4">Income by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
  <BarChart data={incomeData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value">
      {incomeData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default VisualReports;
