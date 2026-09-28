/* ===== CART MODULE ===== */
(function(){
  'use strict';

  var cart = [
    {id:'eldenring',name:'Elden Ring',latin:'FromSoftware',price:3200,img:'eldenring',light:'RPG',qty:1},
    {id:'baldursgate',name:'Baldur\'s Gate 3',latin:'Larian Studios',price:3800,img:'baldursgate',light:'RPG',qty:1},
    {id:'riftapart',name:'Ratchet & Clank: Rift Apart',latin:'Insomniac Games',price:2400,img:'riftapart',light:'Экшен',qty:1}
  ];

  var COVERS = {
    eldenring: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzdDM0FFRCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRDMUQ5NSIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9IiM3QzNBRUQiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjN0MzQUVEIi8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+RVI8L3RleHQ+Cjwvc3ZnPg==',
    baldursgate: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzhCNUNGNiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzVCMjFCNiIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9IiM4QjVDRjYiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjOEI1Q0Y2Ii8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+QkczPC90ZXh0Pgo8L3N2Zz4=',
    riftapart: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzI1NjNFQiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFFM0E4QSIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9IiMyNTYzRUIiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjMjU2M0VCIi8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+UiZDPC90ZXh0Pgo8L3N2Zz4=',
    hogwarts: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzZEMjhEOSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzNCMDc2NCIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9IiM2RDI4RDkiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjNkQyOEQ5Ii8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+SEw8L3RleHQ+Cjwvc3ZnPg==',
    spiderman: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFENEVEOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBGMTcyQSIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiIGZpbGw9IiMxRDRFRDgiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjMUQ0RUQ4Ii8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+U00yPC90ZXh0Pgo8L3N2Zz4=',
    residentevil4: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzNCODJGNiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFFMjkzQiIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzOiIHI9IjQiIGZpbGw9IiMzQjgyRjYiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjM0I4MkY2Ii8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+UkU0PC90ZXh0Pgo8L3N2Zz4=',
    granturismo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0VBNTgwQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdDMkQxMiIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzOiIHI9IjQiIGZpbGw9IiNFQTU4MEMiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjRUE1ODBDIi8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNzQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+R1Q3PC90ZXh0Pgo8L3N2Zz4=',
    eafc25: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0Y5NzMxNiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlBMzQxMiIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzOiIHI9IjQiIGZpbGw9IiNGOTczMTYiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjRjk3MzE2Ii8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+RkMyNTwvdGV4dD4KPC9zdmc+',
    nba2k25: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDAgNDQwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZCOTIzQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdDMkQxMiIvPgo8L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ0MCIgaGVpZ2h0PSI0NDAiIGZpbGw9InVybCgjZykiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjAuMCwxMTQuMCkgc2NhbGUoMy4yKSIgb3BhY2l0eT0iMC4xNiI+CjxwYXRoIGQ9Ik0yMCAxNSBIODAgYTE4IDE4IDAgMCAxIDE4IDIwIGwtNCAxNiBhMTAgMTAgMCAwIDEgLTE3IDUgTDY0IDQ0IEgzNiBMMjMgNTYgYTEwIDEwIDAgMCAxIC0xNyAtNSBsLTQgLTE2IEExOCAxOCAwIDAgMSAyMCAxNSBaIiBmaWxsPSIjZmZmZmZmIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzoiIHI9IjQiIGZpbGw9IiNGQjkyM0MiLz48Y2lyY2xlIGN4PSI3MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjRkI5MjNDIi8+CjwvZz4KPHRleHQgeD0iMjIwIiB5PSIyNDgiIGZvbnQtZmFtaWx5PSJIYW5rZW4gR3JvdGVzaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZvbnQtc2l6ZT0iNTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSItMSI+MksyNTwvdGV4dD4KPC9zdmc+'
  };

  var navCartCount = document.getElementById('navCartCount');
  var cartBadge = document.getElementById('cartBadge');
  var cartList = document.getElementById('cartList');

  function qtyTotal(){ return cart.reduce(function(a,i){ return a+i.qty; },0); }
  function money(n){ return n.toLocaleString('ru-RU')+' ₽'; }

  window.PLAYDROP = window.PLAYDROP || {};
  window.PLAYDROP.getCart = function(){ return cart.slice(); };
  window.PLAYDROP.clearCart = function(){ cart=[]; renderCart(); };

  function renderCart(){
    var count = qtyTotal();
    if(navCartCount) navCartCount.textContent = count;
    if(cartBadge) cartBadge.textContent = count;
    if(!cartList) return;
    if(cart.length === 0){
      cartList.innerHTML = '<div class="cart-empty">'+
        '<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" stroke="currentColor" stroke-width="2.4"/><path d="M20 24h4l2 8h8l3-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
        '<h3>Ваша корзина пуста</h3><p>Вернитесь в каталог и выберите что-нибудь из хитов продаж.</p></div>';
    } else {
      cartList.innerHTML = cart.map(function(it){
        return '<div class="cart-item" data-cid="'+it.id+'">'+
          '<div class="ci-media"><img src="'+(COVERS[it.img]||'')+'" width="76" height="76" alt="'+it.name+'"></div>'+
          '<div class="ci-info"><h3>'+it.name+'</h3><div class="ci-latin">'+it.latin+'</div>'+
            '<div class="ci-meta"><span>'+it.light+'</span><span>· '+money(it.price)+' за шт.</span></div></div>'+
          '<div class="ci-right"><div class="ci-price">'+money(it.price*it.qty)+'</div>'+
            '<div class="qty"><button data-dec aria-label="Decrease">−</button><span class="qv">'+it.qty+'</span><button data-inc aria-label="Increase">+</button></div>'+
            '<button class="ci-remove" data-remove><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><use href="#i-playdrop-6"/></svg>Убрать</button>'+
          '</div></div>';
      }).join('');
    }
    renderSummary();
  }

  function renderSummary(){
    var sub = cart.reduce(function(a,i){ return a+i.price*i.qty; },0);
    var tax = Math.round(sub*0.08);
    var count = qtyTotal();
    var set = function(id,v){ var el = document.getElementById(id); if(el) el.textContent = v; };
    set('sumCount','('+count+' item'+(count===1?'':'s')+')');
    set('sumSubtotal',money(sub));
    set('sumTax',money(tax));
    set('sumTotal',money(sub+tax));
  }

  if(cartList){
    cartList.addEventListener('click', function(e){
      var row = e.target.closest('.cart-item'); if(!row) return;
      var id = row.getAttribute('data-cid');
      var it = cart.filter(function(x){ return x.id===id; })[0]; if(!it) return;
      if(e.target.closest('[data-inc]')){ it.qty++; renderCart(); }
      else if(e.target.closest('[data-dec]')){ it.qty--; if(it.qty<1){ cart=cart.filter(function(x){ return x.id!==id; }); } renderCart(); }
      else if(e.target.closest('[data-remove]')){ cart=cart.filter(function(x){ return x.id!==id; }); renderCart(); }
    });
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-add]'); if(!b) return;
    var id = b.getAttribute('data-id');
    var ex = cart.filter(function(x){ return x.id===id; })[0];
    if(ex){ ex.qty++; } else {
      cart.push({id:id,name:b.getAttribute('data-name'),latin:b.getAttribute('data-latin'),
        price:parseInt(b.getAttribute('data-price'),10),img:b.getAttribute('data-img'),
        light:({low:'RPG',medium:'Экшен',bright:'Спорт и гонки'})[b.getAttribute('data-light')||'medium'],qty:1});
    }
    renderCart();
    var orig = b.innerHTML; b.classList.add('added'); b.innerHTML='Добавлено ✓';
    setTimeout(function(){ b.classList.remove('added'); b.innerHTML = orig; }, 1100);
  });

  renderCart();
})();
