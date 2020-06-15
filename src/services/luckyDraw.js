import request from '@/utils/request'

export default {
  activityDetail (appId, activityId) {
    return request.get(`/rest/activity/${appId}/luckyWheel/page/lottery`)
  },
  activityInfo (appId, activityId) {
    return request.get(`/rest/activity/${appId}/luckyWheel/whole/data/${activityId}`)
  }
}
