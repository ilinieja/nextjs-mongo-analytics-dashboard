import DayStatsModel from "../models/day-stats.model";
import { DbConnection } from "../utils/dbConnection";

export interface TotalStats {
  revenue: number;
  orders: number;
  averageOrderRevenue: number;
}

export class TotalStatsService {
  @DbConnection()
  async getTotalStats(startDate: Date, endDate: Date) {
    const totalStats = await DayStatsModel.aggregate<TotalStats>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$revenue" },
          orders: { $sum: "$orders" },
          averageOrderRevenue: { $avg: "$averageOrderRevenue" },
        },
      },
      {
        $project: {
          _id: false,
          revenue: true,
          orders: true,
          averageOrderRevenue: true,
        },
      },
    ]).exec();

    return totalStats[0];
  }
}