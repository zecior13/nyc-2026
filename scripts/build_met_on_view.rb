#!/usr/bin/env ruby
# Generates a compact, reviewable snapshot from The Met Open Access CSV.
# Usage: ruby scripts/build_met_on_view.rb /tmp/MetObjects.csv met-on-view-data.js

require "csv"
require "json"

source = ARGV.fetch(0)
target = ARGV.fetch(1, "met-on-view-data.js")

artists = {
  "Claude Monet" => "Claude Monet",
  "Vincent van Gogh" => "Vincent van Gogh",
  "Edgar Degas" => "Edgar Degas",
  "Edouard Manet" => "Édouard Manet",
  "Pierre-Auguste Renoir" => "Pierre-Auguste Renoir",
  "Auguste Renoir" => "Pierre-Auguste Renoir",
  "Rembrandt (Rembrandt van Rijn)" => "Rembrandt",
  "Rembrandt" => "Rembrandt",
  "Henri Matisse" => "Henri Matisse",
  "Jackson Pollock" => "Jackson Pollock",
  "Andy Warhol" => "Andy Warhol",
  "Vasily Kandinsky" => "Vasily Kandinsky",
  "Pablo Picasso" => "Pablo Picasso",
  "Marc Chagall" => "Marc Chagall"
}.freeze

rows = []
CSV.foreach(source, headers: true) do |row|
  artist = artists[row["Artist Display Name"]]
  next unless artist
  next unless row["Classification"] == "Paintings"
  next if row["Gallery Number"].to_s.empty?

  rows << {
    id: "met-oa-#{row['Object ID']}",
    objectId: row["Object ID"].to_i,
    artist: artist,
    title: row["Title"],
    year: row["Object Date"],
    gallery: row["Gallery Number"],
    url: row["Link Resource"].to_s.sub("http://", "https://")
  }
end

rows.sort_by! { |row| [row[:artist], row[:year], row[:title]] }

File.write(target, <<~JS)
  // Generated from The Metropolitan Museum of Art Open Access CSV.
  // Snapshot: 2026-08-05. Gallery assignment means "on view" at generation time.
  const MET_ON_VIEW_WORKS = #{JSON.pretty_generate(rows)};
JS

warn "Generated #{rows.length} current-gallery paintings in #{target}"
