"use server";

import prisma from "../../lib/prisma";
import getSession from "../../lib/getSession";

export async function createChart({
  data,
  globalSettings,
  miniChartSettings,
  chartSettings,
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
