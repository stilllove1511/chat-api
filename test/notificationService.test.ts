import { describe } from '@jest/globals'
import { NotificationService } from '@src/service/notification.service'

describe('NotificationService', () => {
    it('push notification', async () => {
        const notificationService = new NotificationService()
        await notificationService.sendNotification({
            title: 'NodeJS',
            body: 'Message from NodeJS',
            token: 'eLiACK5gT4CvKCPJWf73By:APA91bFvgatneMvWR0votH4UgtMBhOrggW7StB8B-B2PvclBzINPFR3P2vJkquWQL5U91k6gt9_GMTEa2-ShtvVWOlovRtfqTRHLJybssiRKq0OezZWa_FTy2JXLq4zB5POqOHNvpwYP',
        })
    })
})
