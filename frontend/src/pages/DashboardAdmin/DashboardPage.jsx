
import { StatisticCard } from "@/components/admin/Dashboard/Card";
import { bills } from "@/components/admin/Dashboard/fetchingData";
import { foods } from "@/components/admin/Food/fetchingData";
import ChartLine from "@/components/admin/Dashboard/chartLine";
import BestSeller from "@/components/admin/Dashboard/bestSeller";
import ChartDonut from "@/components/admin/Dashboard/chartDonut";
export default function DashboardPage() {
      return (
            <view>
                  <StatisticCard bills={bills} foods={foods} />
                  <ChartLine bills={bills}/>
                  <div className="md:flex">
                        <BestSeller bills={bills}/>
                        <ChartDonut bills={bills}/>
                  </div>
            </view>
      )

}