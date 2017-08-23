## Nerd-s-flashCards


Team :bowtie:   @Qamar-93 , @mahmoudalwadia , @aajour , @Ghadeer93 :bowtie:

# Project Idea :question: :question:

 Our web-application can help you make topics which contain private card.

 # How can user uses this Application :pray: :pray:

* User can make login or sing up .
* When User make sing up can see all users in this Application then can create topics and cards.
* User can interact with others by watching pubic topics and private card , and click like on cards

# Project Analysis

Schema for Database

Table users


| id  | name | usaname | password |
| --- | ------------ | ------ | -------- |
| 1   | Qamer | Qamer93 | 123456 |
| 2   | Mahmmoud | Mahmmoud96 | 123456 |
| 3   | Ghadeer | Ghadeer93 | 123456|



Table topics


| id  | title | status | user_id |
| --- | ------------ | ------ | -------- |
| 1   | Qamer | true | 1 |
| 2   | Mahmmoud | false | 2 |
| 3   | Ghadeer | false | 3|



Table cards

| id  | content | likes | topics_id |
| --- | ------------ | ------ | -------- |
| 1   | qqqqqqqqqqqqqqqq | 9 | 1 |
| 2   | MahmmoudMahmmoud | 5 | 2 |
| 2   | GHDEERGHDEERGHDR | 7 |3 |





Table topic_likes



| id  | likes | user_id | topics_id |
| --- | ------------ | ------ | -------- |
| 1   | 9 | 1 | 1 |
| 2   | 5 | 2 | 2 |
| 3   | 5 | 3 | 3|







For test visit this link :point_right: :point_right:

Thank you :v: enjoy :grinning:
