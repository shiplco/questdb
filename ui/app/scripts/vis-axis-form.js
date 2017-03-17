/*******************************************************************************
 *    ___                  _   ____  ____
 *   / _ \ _   _  ___  ___| |_|  _ \| __ )
 *  | | | | | | |/ _ \/ __| __| | | |  _ \
 *  | |_| | |_| |  __/\__ \ |_| |_| | |_) |
 *   \__\_\\__,_|\___||___/\__|____/|____/
 *
 * The MIT License (MIT)
 *
 * Copyright (C) 2016-2017 Appsicle
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

/*globals jQuery:false */

(function ($) {
        'use strict';
        $.fn.axisForm = function () {
            const div = $(this);
            const fName = div.find('#_vis_frm_axis_name')[0];
            const fType = div.find('#_vis_frm_axis_type')[0];
            const fValueType = div.find('#_vis_frm_axis_value_type')[0];
            const fColumn = div.find('#_vis_frm_axis_column')[0];
            const fValues = div.find('#_vis_frm_axis_values')[0];

            let last;

            function newQuery(index) {
                return {
                    id: '_li_axis_' + index,
                    name: 'axis' + index
                };
            }

            function copyToForm(axis) {
                last = axis;

                fName.value = axis.name;
                if (axis.type) {
                    fType.value = axis.type;
                } else {
                    fType.value = 'X-axis';
                }

                if (axis.valueType) {
                    fValueType.value = axis.valueType;
                } else {
                    fValueType.value = 'Category column';
                }

                if (axis.column) {
                    fColumn.value = axis.column;
                } else {
                    fColumn.value = '';
                }

                if (axis.values) {
                    fValues.value = axis.values;
                } else {
                    fValues.value = '';
                }
            }

            function copyToMem(axis) {
                console.log('axis copy to mem');
                axis.name = fName.value;
                axis.type = fType.value;
                axis.valueType = fValueType.value;
                axis.column = fColumn.value;
                axis.values = fValues.value;
                return true;
            }

            function copyToLast() {
                if (last) {
                    copyToMem(last);
                }
            }

            function clear() {
                fName.value = '';
                fType.value = 'X-axis';
                fValueType.value = 'Category column';
                fColumn.value = '';
                fValues.value = '';
            }

            fName.onfocusout = copyToLast;
            fType.onfocusout = copyToLast;
            fValueType.onfocusout = copyToLast;
            fColumn.onfocusout = copyToLast;
            fValues.onfocusout = copyToLast;

            return div.listManager(newQuery, copyToForm, copyToMem, clear);
        };
    }(jQuery)
);
