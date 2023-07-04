import ParticipationPointsModal from "@src/components/ParticipationPointsModal/ParticipationPointsModal";

const expMetrics = new Map<String, Number>();

export const saveExpMetrics = () => {
  const serializedExpMetrics = JSON.stringify(expMetrics);
  localStorage.setItem('expMetrics', 'set');
  localStorage.setItem('expMetricsSerialized', serializedExpMetrics);
}

export const isExpMetricsInStorage = (): boolean => {
  const serializedExpMetricsState = localStorage.getItem('expMetrics');
  return serializedExpMetricsState === 'set';
}

export const loadExpMetrics = () => {
  localStorage.getItem('expMetricsSerialized');
}

export const setExpMetric = (name: String, exp: Number) => {
  expMetrics.set(name, exp);
}

export const awardExp = (name: String, amount: Number) => {
  const expMetricEntry = expMetrics.get(name);
  if (expMetricEntry === undefined)
    return;
  expMetrics.set(name, expMetricEntry.valueOf() + amount.valueOf());
}

export const getRank = (name: String): Number => {
  const expMetricEntry = expMetrics.get(name);
  if (expMetricEntry === undefined)
    return Number.MAX_VALUE;
  
  const expIterator = expMetrics.values();

  var expIteratorNext = expMetrics.values().next();
  var currRank = 1;
  while (expIteratorNext.done === false) {
    if (expIteratorNext.value !== undefined && expIteratorNext.value > expMetricEntry)
      currRank += 1;
    expIteratorNext = expIterator.next();
  }
  return currRank;
}

export const getExpMetric = (name: String): Number => {
  const expMetric = expMetrics.get(name);
  if (expMetric === undefined)
    return -1;
  return expMetric;
}

export const getListOfNamesInAscendingRankOrder = (): String[] => {
  const names = Array.from(expMetrics.keys());
  names.sort((nameA, nameB) => getRank(nameA).valueOf() - getRank(nameB).valueOf());

  return names;
}

export const isParticipantAssociatedWithAnExpMetric = (name: String): boolean => {
  return expMetrics.get(name) !== undefined;
}

// const getExp
