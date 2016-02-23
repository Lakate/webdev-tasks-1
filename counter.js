'use strict';

const request = require('request');
const fs = require('fs');
const async = require('async');
const stopWords = require('./stopWords.json');

const OATH_TOKEN = fs.readFileSync('key.txt', 'utf-8');
const GITHUB_API = 'https://api.github.com';
<<<<<<< HEAD
var GET_ROOT_SITE = 'http://vnutrislova.net/' + encodeURI('������/��-�������/');
var REGEXP = /[^�-��-���]+/g;
=======
var GET_ROOT_SITE = 'http://vnutrislova.net/' + encodeURI('разбор/по-составу/');
var REGEXP = /[^А-Яа-яёЁ]+/g;
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
const stopRepos = ['urfu-2015/verstka-lectures', 'urfu-2015/javascript-lectures',
    'urfu-2015/guides', 'urfu-2015/javascript-slides',
    'urfu-2015/verstka-slides', 'urfu-2015/html-test-suite', 'urfu-2015/rebase-example-repo',
    'urfu-2015/hrundel-board', 'urfu-2015/webdev-lectures', 'urfu-2015/webdev-slides'];

module.exports.top = function (n) {
    getStatistics(n, 'top');
};

module.exports.count = function (word) {
    getStatistics(word, 'count');
};

/**
<<<<<<< HEAD
 * �������� �������, ����������� ������� � Github,
 * � ������� ������� ���� �� �������, � ���������� ������ ������
 *
 * @param req number|word
 * @param type top|count ��� �������
=======
 * Оснавная функция, выполняющая запросы к Github,
 * к сервису разбора слов по составу, и проводящая анализ данных
 *
 * @param req number|word
 * @param type top|count тип запроса
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
 */
function getStatistics(req, type) {
    async.waterfall([
            /**
<<<<<<< HEAD
             * �������, ����������� ������ � GitHub,
             * � ���������� � callback ��� ����������� urfu-2015
=======
             * функция, выполняющая запрос к GitHub,
             * и передающая в callback все репазитории urfu-2015
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
             *
             * @param callback
             */
                function getRepos(callback) {
                request({
                        url: GITHUB_API + '/orgs/urfu-2015/repos?access_token=' + OATH_TOKEN,
                        method: 'GET',
                        headers: {'User-Agent': 'Webdev homework 1.0.0'}
                    },
                    function (err, res, body) {
                        if (!err && res.statusCode === 200) {
                            var reposList = JSON.parse(body);
                            callback(err, reposList.map(function (repos) {
                                return repos.full_name;
                            }));
                        }
                    }
                );
            },
            /**
<<<<<<< HEAD
             * �������, ���������� ��� ����� readme �� ������������
=======
             * Функция, собирающая все файлы readme из репазиториев
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
             *
             * @param reposList
             * @param callback
             */
                function getAllReadme(reposList, callback) {
                var reposContent = '';
                reposList = reposList.filter(function (repos) {
                    return stopRepos.indexOf(repos) === -1;
                });

                async.forEach(reposList, function (repos, next) {
                    request({
                            url: GITHUB_API + '/repos/' + repos +
<<<<<<< HEAD
                            '/readme?access_token=' + OATH_TOKEN,
=======
                                        '/readme?access_token=' + OATH_TOKEN,
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
                            method: 'GET',
                            headers: {'User-Agent': 'Webdev homework 1.0.0'}
                        },
                        function (err, res, body) {
                            if (!err && res.statusCode === 200) {
                                var parsedBody = JSON.parse(body);
                                reposContent += ' ' + (new Buffer(parsedBody.content,
<<<<<<< HEAD
                                        parsedBody.encoding).toString('utf-8'));
=======
                                                    parsedBody.encoding).toString('utf-8'));
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
                                next();
                            }
                        }
                    );
                }, function (err, content) {
                    callback(null, reposContent);
                });
            },
            /**
<<<<<<< HEAD
             * ������� - ������, ��������� ������ ������� �����, ��� ���������,
             * ������ � ������ ����������
=======
             * Функция - парсер, оставляет только русские слова, без предлогов,
             * союзов и знаков препинания
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
             *
             * @param reposContent
             * @param callback
             */
                function splitAllContent(reposContent, callback) {
                reposContent = reposContent.toLowerCase().split(REGEXP);
                callback(null, reposContent);
            },
            /**
<<<<<<< HEAD
             * �������, ����������� ����� ����, � ������������ ������� ���������� ����
=======
             * Функция, вычисляющая корни слов, и производящая подсчет повторений слов
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
             *
             * @param reposContent
             * @param callback
             */
                function doCount(reposContent, callback) {
<<<<<<< HEAD
                // wordsRoots - ��� ������� ����� �������� ��� ������
                var wordsRoots = {};
                /* countRepetitions[root] {root, count, word} - ���������, ��� �������� ����������.
                 count - ����� ����������, word - ������ ����� � ���� ������.
                 ��� ������� � ����������
                 */
=======
                // wordsRoots - для каждого слова хранится его корень
                var wordsRoots = {};
                /* countRepetitions[root] {root, count, word} - структура, для хранения повторений.
                    count - число повторений, word - первое слово с этим коренм.
                    Его выведем в статистику
                */
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
                var countRepetitions = {};
                async.eachSeries(reposContent, function (word, next) {
                    request({
                            url: GET_ROOT_SITE + encodeURI(word),
                            method: 'GET'
                        },
                        function (err, res, body) {
                            if (stopWords.indexOf(word) === -1 && word !== '') {
                                if (!err && res.statusCode === 200) {
                                    body = body.split(' ');
<<<<<<< HEAD
                                    var rootIndex = body.indexOf('������');
                                    if (rootIndex !== -1) {
                                        if (wordsRoots[word] === undefined) {
                                            var currentRoot = body[rootIndex + 1].
                                                replace(REGEXP, '');
                                            if (countRepetitions[currentRoot] === undefined) {
                                                countRepetitions[currentRoot] =
                                                {'root': currentRoot, 'count': 0, 'word': word};
=======
                                    var rootIndex = body.indexOf('корень');
                                    if (rootIndex !== -1) {
                                        if (wordsRoots[word] === undefined) {
                                            var currentRoot = body[rootIndex + 1].
                                                                        replace(REGEXP, '');
                                            if (countRepetitions[currentRoot] === undefined) {
                                                countRepetitions[currentRoot] =
                                                    {'root': currentRoot, 'count': 0, 'word': word};
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
                                            }
                                            wordsRoots[word] = currentRoot;
                                        }
                                    }
                                }
                                if (wordsRoots[word] === undefined) {
                                    if (countRepetitions[word] === undefined) {
                                        countRepetitions[word] = { 'root': word, 'count': 0,
                                            'word': word};
                                    }
                                    wordsRoots[word] = word;
                                }
                                countRepetitions[wordsRoots[word]].count += 1;
                            }
                            next();
                        }
                    );
                }, function (err) {
                    callback(null, countRepetitions, wordsRoots);
                });
            }
        ],
        /**
<<<<<<< HEAD
         * �������� callback
=======
         * Основной callback
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
         *
         * @param err
         * @param countRepetitions
         * @param wordsRoots
         */
        function (err, countRepetitions, wordsRoots) {
            if (type === 'top') {
                getTop(req, countRepetitions);
            } else {
                getCount(req, countRepetitions, wordsRoots);

            }
        });
}

/**
<<<<<<< HEAD
 * ��������������� �������, ��� ����������
=======
 * Вспомогательная функция, для сортировки
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
 *
 * @param a
 * @param b
 * @returns {number}
 */
function compare(a, b) {
    if (a.count > b.count) {
        return -1;
    }
    if (a.count < b.count) {
        return 1;
    }
}

/**
<<<<<<< HEAD
 * ������� ������ n ������ ����
=======
 * Функция вывода n первых слов
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
 *
 * @param count
 * @param countRepetitions
 */
function getTop(count, countRepetitions) {
    var sortedCount = [];
    for (var el in countRepetitions) {
        sortedCount.push(countRepetitions[el]);
    }
    sortedCount.sort(compare);
    count = count > sortedCount.length ? sortedCount.length : count;
    for (var i = 0; i < count; i++) {
        process.stdout.write(sortedCount[i].word + ' ' + sortedCount[i].count + '\n');
    }
}

/**
<<<<<<< HEAD
 * ������� ������ ���������� ����� word
=======
 * Функция вывода повторений слова word
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
 *
 * @param word
 * @param countRepetitions
 * @param wordsRoots
 */
function getCount(word, countRepetitions, wordsRoots) {
    if (wordsRoots[word] === undefined) {
        process.stdout.write(0);
    } else {
        process.stdout.write(countRepetitions[wordsRoots[word]].count);
    }
<<<<<<< HEAD
}/**
 * Created by mv on 23.02.2016.
 */
=======
}
>>>>>>> 23d04564dcb92aff99527aaf2b8c1bf449b0502c
