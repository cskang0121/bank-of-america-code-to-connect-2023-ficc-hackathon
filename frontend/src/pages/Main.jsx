import React from 'react'

const Main = () => {
  return (
    <div className="flex flex-col justify-between w-full">
        <div className='h-3/4'>
            Hello
        </div>
          <div className="overflow-x-auto w-full">
              <table className="table block h-1/4 overflow-y-scroll w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th className='sticky top-0'>CCY</th>
                        <th className='sticky top-0'>Tenor</th>
                        <th className='sticky top-0'>Position</th>
                        <th className='sticky top-0'>Ask</th>
                        <th className='sticky top-0'>Bid</th>
                        <th className='sticky top-0'>QuoteStatus</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {/* row 1 */}
                    <tr className="hover">
                        <td>CHX</td>
                        <td>1M</td>
                        <td>-3000</td>
                        <td>0.9</td>
                        <td>0.8997</td>
                        <td>TRADABLE</td>
                    </tr>
                    {/* row 2 */}
                    <tr className="hover">
                        <td>JPX</td>
                        <td>1M</td>
                        <td>1000</td>
                        <td>NA</td>
                        <td>NA</td>
                        <td>EXCEPTION</td>
                    </tr>
                    {/* row 3 */}
                    <tr className="hover">
                        <td>KRX</td>
                        <td>6M</td>
                        <td>2000</td>
                        <td>1321.9869</td>
                        <td>1321.9866</td>
                        <td>TRADABLE</td>
                    </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                      <tr className="hover">
                          <td>KRX</td>
                          <td>6M</td>
                          <td>2000</td>
                          <td>1321.9869</td>
                          <td>1321.9866</td>
                          <td>TRADABLE</td>
                      </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Main