import { Card, Title, BarChart, Subtitle } from "@tremor/react"
import { useEffect, useState } from "react"

export default function Home() {
  const versions = [
    "v0.27.0",
    "v0.26.4",
    "v0.26.3",
    "v0.26.2",
    "v0.26.1",
    "v0.26.0",
    "v0.25.0",
    "v0.24.0",
    "v0.23.0",
    "v0.22.0",
    "v0.21.0",
    "v0.20.0",
    "v0.19.0",
    "v0.18.0",
    "v0.17.0",
    "v0.16.0",
    "v0.15.0",
    "v0.14.0",
    "v0.13.0",
    "v0.12.0",
    "v0.11.0",
    "v0.10.0",
    "v0.9.0",
    "v0.8.0",
    "v0.7.0",
  ]
  const [chartData, setChartData] = useState([])

  const dataFormatter = (number) => {
    return Intl.NumberFormat("us").format(number).toString()
  }

  useEffect(() => {
    const srcTxIds = [
      "jsZqVEOGdMFAvVlof_WXi6DO5vWxhteiG91xVPiIwqQ",
      "QhbIPso1lx8wbHx4c7225L9PkNYh-Djp6N_YCjqdr_E",
      "rTp2E6oipzJODmAGbqWbo2wzagoV7tt3JRyBsyVgo6A",
      "-TBbRLWsP8wAlj8y5bh7RHRdwGJ7kT9urFvEbn1UomQ",
      "OSYm83qQFF5gf4m3BbdZtrHMHjVAMPJcBhfZiJVYjYE",
      "zdP_QTSZ2zO9Nxa1sPAKhyR4geua1_a621_fZm2XPKU",
      "_156pyhqtRr6Zh3KX-Hp4q3-CIrMa2leTqKdu2HpXB8",
      "fuSpwZIxJtIq3eTdbRgBSwsFYd5f6oMwKB91RR3hXOo",
      "_gUR1-XzkZhsMlzZLIUEYp-rg73b9W-bhSrRIb06zKk",
      "JglKj1PoKu1moG7H3uAP1HxnXRH4kDIuqQzil1ZlbLc",
      "nNz22bZG_Y2K9r68iqnL1iOPEu8rvqCWNE4TX17OsgA",
      "pfzMiEGWwoyAL33M2ceRUkgG3XvxUyjxUqiyLNHD66g",
      "jhQ9kWIqjNYzGrg96zr7q7xbot4NwkKT8UZwsrb-fvE",
      "fHH99N1FIxkU-vYwbg30eYHpBpOjN_Qa3k3ch73Yz04",
      "WEFEoY33ntimvQzUtC7bS3A1bsGRrtXST_z9E8yx9yw",
      "viUyq-GD9kxDYRVkvT-NPjEvzLIgQYEx70DoliFwytQ",
      "ZRREoTw94icjJVyVnCHnR7T_Q96AWLLLnYugmt9OgAQ",
      "ThKJQwNBy2tdELecqmlG86bo9NacyMxquQef1DOLBPA",
      "4lSfFFQIpX37GMdab6c4ZdWli33b70qu_KJan5vB1ZI",
      "8dUFGgl05GiunNN_5LMBYEorkS2Znr1-L2JYVb0Cpm4",
      "9vwjxsX0856iTRFsEMEXBC7UFJ3Utok_e6dFyB1s4TA",
      "F-nDTtI50sJYDJyPq3cqnQg2UApu9_bBoy8NItEPPQI",
      "eufj3L8Qx1JPLVnoJHWRNNj5FvJ4E8OT07MZ9BhmpT8",
      "cvDUleFkH8v_hU-pBwInngotLszGpUGF-e_Ask6juwI",
      "7vXOxkxZ_eG0mwBO4pc_mB_oh1MY4pmHXzRQJfdMGCw",
    ]

    const fetchData = async (srcTxId) => {
      try {
        const response = await fetch(
          `https://gateway.warp.cc/gateway/contracts-by-source?id=${srcTxId}`
        )
        const jsonData = await response.json()
        return jsonData
      } catch (error) {
        console.error("Error fetching data:", error)
        return null
      }
    }

    ;(async () => {
      try {
        const newData = await Promise.all(
          srcTxIds.map(async (srcTxId, index) => {
            const data = await fetchData(srcTxId)
            return {
              name: versions[index],
              "Number of deployed database": data?.paging?.items,
            }
          })
        )

        setChartData(newData)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <>
      <Card>
        <Title>WeaveDB</Title>
        <Subtitle>
          Contract versions with their corresponding number of deployed database
        </Subtitle>
        <BarChart
          className="mt-6"
          data={chartData}
          index="name"
          categories={["Number of deployed database"]}
          colors={["purple"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          showXAxis={false}
          noDataText="Fetching Data....."
        />
      </Card>
    </>
  )
}