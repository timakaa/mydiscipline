"use server";

import prisma from "../../lib/prisma";
import getSession from "../../lib/getSession";

export async function createChart({
  data,
  globalSettings,
  miniChartSettings,
  chartSettings,
  fromDate,
  toDate,
}) {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const chartsCount = await prisma.chart.count({
      where: {
        userId: session.user.id,
      },
    });

    if (chartsCount >= 10) {
      throw new Error("Maximum limit of 10 charts reached");
    }

    const chart = await prisma.chart.create({
      data: {
        data: data,
        globalSettings: globalSettings,
        miniChartSettings: miniChartSettings,
        chartSettings: chartSettings,
        userId: session.user.id,
        fromDate: fromDate ? new Date(fromDate) : null,
        toDate: toDate ? new Date(toDate) : null,
      },
    });

    return { chart };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCharts() {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const charts = await prisma.chart.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: "asc",
      },
    });

    return { charts };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateChartsOrder(chartIds) {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    // Update orders in transaction
    await prisma.$transaction(
      chartIds.map((chartId, index) =>
        prisma.chart.update({
          where: { id: chartId },
          data: { order: index },
        })
      )
    );

    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getChartById(id) {
  try {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const chart = await prisma.chart.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!chart) {
      throw new Error("Chart not found");
    }

    return { chart };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changeChart({ id, chart }) {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const updatedChart = await prisma.chart.update({
      where: { id, userId: session.user.id },
      data: chart,
    });

    if (!updatedChart) {
      throw new Error("Chart not found");
    }

    return { updatedChart };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteChart(id) {
  try {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const deletedChart = await prisma.chart.delete({
      where: { id, userId: session.user.id },
    });

    if (!deletedChart) {
      throw new Error("Chart not found");
    }

    return { deletedChart };
  } catch (error) {
    throw new Error(error.message);
  }
}
