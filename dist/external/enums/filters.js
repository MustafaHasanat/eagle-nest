var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (SortDirection = {}));
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["CONTAINS"] = "contains";
    FilterOperator["MORE"] = "moreThan";
    FilterOperator["MORE_EQ"] = "moreThanOrEqual";
    FilterOperator["LESS"] = "lessThan";
    FilterOperator["LESS_EQ"] = "lessThanOrEqual";
    FilterOperator["NUMBER_EQUALS"] = "numberEquals";
    FilterOperator["STRING_EQUALS"] = "stringEquals";
})(FilterOperator || (FilterOperator = {}));
export { SortDirection, FilterOperator };
//# sourceMappingURL=filters.js.map