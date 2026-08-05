#!/usr/bin/env ruby
# Pobiera brakujące reprodukcje Open Access przez oficjalne API The Met.

require "json"
require "net/http"
require "uri"
require "fileutils"

source = ARGV.fetch(0, "met-on-view-data.js")
target = ARGV.fetch(1, "assets/photos")
ids = File.read(source).scan(/"objectId":\s*(\d+)/).flatten.map(&:to_i).uniq
FileUtils.mkdir_p(target)

ids.each_with_index do |id, index|
  destination = File.join(target, "met-#{id}.jpg")
  next if File.exist?(destination) && File.size(destination) > 5_000

  api_uri = URI("https://collectionapi.metmuseum.org/public/collection/v1/objects/#{id}")
  metadata = JSON.parse(Net::HTTP.get(api_uri))
  image_url = metadata["primaryImageSmall"].to_s
  image_url = metadata["primaryImage"].to_s if image_url.empty?
  if image_url.empty?
    warn "#{id}: brak reprodukcji w API"
    next
  end

  image_uri = URI(image_url)
  response = Net::HTTP.get_response(image_uri)
  unless response.is_a?(Net::HTTPSuccess)
    warn "#{id}: HTTP #{response.code}"
    next
  end
  File.binwrite(destination, response.body)
  warn "#{index + 1}/#{ids.length}: #{id}"
  sleep 0.05
end
