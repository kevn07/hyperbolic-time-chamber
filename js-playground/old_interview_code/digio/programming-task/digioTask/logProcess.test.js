import {processLogByLine, getUniqueCount, getTopActivity, getTopNumber} from './logProcessor'


const filePath = 
describe('Testing Log Processor', () => {
  it('return number of unique ip addresses', async () => {
    const processedLog = await processLogByLine('./programming-task-example-data.log')
    expect(getUniqueCount(processedLog.ipCount)).toBe(11)
  })
  it('return top 3 ip addresses', async () => {
    const processedLog = await processLogByLine('./programming-task-example-data.log')
    expect(getTopActivity(processedLog.ipCount, 3)).toStrictEqual([
      { key: '168.41.191.40', count: 4 },
      { key: '177.71.128.21', count: 3 },
      { key: '50.112.00.11', count: 3 },
      { key: '72.44.32.10', count: 3 },
      { key: '168.41.191.9', count: 2 }
    ])
  })
  it('return top 3 URLs', async () => {
    const processedLog = await processLogByLine('./programming-task-example-data.log')
    expect(getTopActivity(processedLog.urlCount, 3)).toStrictEqual([
      { key: '/docs/manage-websites/', count: 2 },
      { key: '/intranet-analytics/', count: 1 },
      { key: 'http://example.net/faq/', count: 1 },
      { key: '/this/page/does/not/exist/', count: 1 },
      { key: 'http://example.net/blog/category/meta/', count: 1 },
      { key: '/blog/2018/08/survey-your-opinion-matters/', count: 1 },
      { key: '/docs/manage-users/', count: 1 },
      { key: '/blog/category/community/', count: 1 },
      { key: '/faq/', count: 1 },
      { key: '/faq/how-to-install/', count: 1 },
      { key: '/asset.js', count: 1 },
      { key: '/to-an-error', count: 1 },
      { key: '/', count: 1 },
      { key: '/docs/', count: 1 },
      { key: '/moved-permanently', count: 1 },
      { key: '/temp-redirect', count: 1 },
      { key: '/faq/how-to/', count: 1 },
      { key: '/translations/', count: 1 },
      { key: '/newsletter/', count: 1 },
      { key: '/hosting/', count: 1 },
      { key: '/download/counter/', count: 1 },
      { key: '/asset.css', count: 1 }
    ])
  })
  it('return first 3 urls & ip address', async () => {
    const processedLog = await processLogByLine('./programming-task-example-data.log')
    expect(getTopNumber(processedLog.urlCount, 3).length).toBe(3)
    expect(getTopNumber(processedLog.ipCount, 3).length).toBe(3)
  })
  it('return empty list retrieving top 3 ip addresses from empty log', () => {
    expect(getTopNumber({}, 3).length).toBe(0)
  })
  it('return 0 unique ip addresses from empty log', () => {
    expect(getUniqueCount({}, 3)).toBe(0);
  })
  it('throw error retrieve top activity', () => {
    expect(() => getTopActivity()).toThrow('getTopActivity: obj passed is invalid')
  })
})