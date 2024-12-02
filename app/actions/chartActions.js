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
    });

    return { charts };
  } catch (error) {
    throw new Error(error.message);
  }
}
